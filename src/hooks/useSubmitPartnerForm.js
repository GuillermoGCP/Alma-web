import { useState } from 'react'
import { toast } from 'react-toastify'

const useSubmitPartnerForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitForm = async (formData) => {
    setIsLoading(true)
    setError(null) // Reset error before sending request

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/new-partner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error en la solicitud:', errorData)
        throw new Error(errorData.error || response.statusText)
      }

      const data = await response.json()

      return data // Devuelve la respuesta para que el componente pueda manejarla
    } catch (error) {
      console.error('Error en la solicitud:', error)
      setError(error.message) // Establecer error si ocurre
      toast.error(error.message) // Muestra un toast con el mensaje de error
      throw error // Lanza el error para que el componente pueda capturarlo
    } finally {
      setIsLoading(false) // Finalizar estado de carga
    }
  }

  return { submitForm, isLoading, error }
}

export default useSubmitPartnerForm
