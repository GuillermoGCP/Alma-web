import React, { useState } from 'react'
import './MySubscriptionModal.css'
import { toast } from 'react-toastify'

const MySubscriptionModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [step, setStep] = useState(1) // Controla en qué paso está el modal
  const [subscriptionStatus, setSubscriptionStatus] = useState('') // Estado de la suscripción

  //Añadimos un estado para la confirmación de que el usuario se ha dado de baja
  const [showUnsubscribeConfirmation, setShowUnsubscribeConfirmation] =
    useState(false)

  const handleClose = () => {
    onClose()
  }

  // Validación simple de email y id
  const isValid = email.trim() !== '' && id.trim() !== ''

  const handleCheckSubscription = async () => {
    if (!isValid) {
      toast.error('Por favor, ingresa un ID y un email válidos.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-subscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            id,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(
          data.message || 'Error al obtener el estado de la suscripción.'
        )
        return
      }

      // Verificar si el usuario tiene una suscripción activa
      setSubscriptionStatus(data.data.state)

      // Cambiar a la siguiente etapa (paso 2) solo si la suscripción fue exitosa
      setStep(2)
    } catch (error) {
      toast.error(
        `Error al obtener el estado de la suscripción: ${
          error.message || 'Desconocido'
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRenewSubscription = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/renew-partnership`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            id,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Error al renovar la suscripción.')
      } else {
        toast.success(
          `Suscripción renovada con éxito. Fecha de renovación: ${data.currentDateOfRenovation}`
        )
      }
    } catch (error) {
      toast.error(
        `Error al renovar la suscripción: ${error.message || 'Desconocido'}`
      )
    } finally {
      setLoading(false)
    }
  }

  const handleUnsubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/unsubscribe-partnership`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            id,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Error al darse de baja.')
      } else {
        toast.success(data.message) // Confirmación de baja exitosa
      }
    } catch (error) {
      toast.error(`Error al darse de baja: ${error.message || 'Desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-overlay my-subscription-modal' onClick={handleClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h2>Mi suscripción</h2>

        {/* Paso 1: Formulario de ingreso de datos */}
        {step === 1 && (
          <div className='modal-form'>
            <input
              type='email'
              placeholder='Ingresa tu correo electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='text'
              placeholder='Ingresa tu ID'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              onClick={handleCheckSubscription}
              disabled={loading || !isValid}
              className='boton-acceder-suscripcion'
            >
              Acceder a mi suscripción
            </button>
          </div>
        )}

        {/* Paso 2: Mostrar estado de la suscripción y botones */}
        {step === 2 && (
          <div className='modal-options'>
            <p>
              Estado de mi suscripción: {subscriptionStatus || 'Cargando...'}
            </p>

            <button
              onClick={handleRenewSubscription}
              disabled={loading}
              className='boton-renovar-suscripcion'
            >
              Renovar mi suscripción
            </button>
            <button
              onClick={() => setShowUnsubscribeConfirmation(true)}
              disabled={loading}
              className='boton-baja-suscripcion'
            >
              Darme de baja
            </button>
            {/*Modal para confirmar que realmente quieres darte de baja*/}
            {showUnsubscribeConfirmation && (
              <div className='confirmacion-baja-overlay'>
                <div className='confirmacion-baja-modal'>
                  <p>
                    ¿Estás seguro de que deseas darte de baja? <br />
                    <span className='mensaje-accion-baja'>
                      Esta acción no se puede deshacer.
                    </span>
                  </p>
                  <button
                    onClick={handleUnsubscribe}
                    disabled={loading}
                    className='confirmacion-baja-modal-boton'
                  >
                    Sí, darme de baja
                  </button>
                  <button
                    onClick={() => setShowUnsubscribeConfirmation(false)}
                    className='confirmacion-cancelar-modal'
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cerrar modal */}
        <button className='close-btn-modal-usuario' onClick={handleClose}>
          <i className='fa-solid fa-circle-xmark'></i>
        </button>
      </div>
    </div>
  )
}

export default MySubscriptionModal
