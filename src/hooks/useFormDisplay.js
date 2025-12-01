import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const useFormDisplay = (jsonNumber, eventId) => {
  const [formToShow, setFormToShow] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Para obtener el formulario publicado:
  useEffect(() => {
    const controller = new AbortController()
    const getPublishedForm = async () => {
      try {
        const searchParams = new URLSearchParams()
        if (eventId) {
          searchParams.append('eventId', eventId)
        }

        const queryString = searchParams.toString()
        const url = `${import.meta.env.VITE_API_URL}/get-published-form/${jsonNumber}${
          queryString ? `?${queryString}` : ''
        }`

        const response = await fetch(url, { signal: controller.signal })
        if (response.ok) {
          const data = await response.json()
          setFormToShow(data.form || {})
        } else {
          console.error('Error al obtener el formulario publicado')
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al obtener el formulario publicado:', error)
        }
      }
    }
    getPublishedForm()

    return () => controller.abort()
  }, [jsonNumber, eventId])

  // Ref para el formulario
  const formRef = useRef(null)

  // Para enviar los resultados del formulario:
  const sendDataHandler = async () => {
    if (!formRef.current || isSubmitting) return
    
    setIsSubmitting(true)
    const formElements = formRef.current.elements
    const formValues = Array.from(formElements).reduce((acc, element) => {
      if (element.name) {
        acc[element.name] = element.value
      }
      return acc
    }, {})

    // Asegurar que usamos un nombre de formulario en string (no objeto)
    const formNameValue =
      typeof formToShow?.formName === 'string'
        ? formToShow.formName
        : formToShow?.formName?.es || formToShow?.formName?.gl || ''

    try {
      const loadingId = toast.loading('Enviando datos...')
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          '/submit-form/' +
          encodeURIComponent(formNameValue),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formValues,
            formName: formNameValue,
          }),
        }
      )

      toast.dismiss(loadingId)

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('¡Inscripción completada con éxito!')
        // NO resetear el formulario - mostrar mensaje de confirmación
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage =
          errorData.error || response.statusText || 'Error desconocido'
        throw new Error(errorMessage)
      }
    } catch (error) {
      toast.error('Error al enviar los datos')
      console.error('Ha ocurrido un error:', error)
    } finally {
         // Dismiss the loading toast from Captcha component if it exists
      if (window.currentLoadingToast) {
        toast.dismiss(window.currentLoadingToast)
        window.currentLoadingToast = null
      }
      setIsSubmitting(false)
    }
  }

  return { sendDataHandler, formRef, formToShow, isSubmitted, isSubmitting }
}

export default useFormDisplay
