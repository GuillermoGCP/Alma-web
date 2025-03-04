import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
const useFormDisplay = (jsonNumber) => {
    const [formToShow, setFormToShow] = useState({})

    //Para obtener el formulario publicado:
    useEffect(() => {
        const getPublishedForm = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL +
                        `/get-published-form/${jsonNumber}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setFormToShow(data.form)
                } else {
                    console.error('Error al enviar los datos')
                }
            } catch (error) {
                console.log('No hay datos que mostrar:', error)
            }
        }
        getPublishedForm()
    }, [])

    // Ref para el formulario
    const formRef = useRef(null)
    //Para enviar los resultados del formulario:
    const sendDataHandler = async () => {
        if (!formRef.current) return
        const formElements = formRef.current.elements
        const formValues = Array.from(formElements).reduce((acc, element) => {
            if (element.name) {
                acc[element.name] = element.value
            }
            return acc
        }, {})

        try {
            toast.loading('Enviando datos...')
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    '/submit-form/' +
                    formToShow.formName,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formValues,
                        formName: formToShow.formName,
                    }),
                }
            )

            if (response.ok) {
                toast.dismiss()
                toast.success('Datos enviados exitosamente')
                console.log('Datos enviados exitosamente', formValues)
                formRef.current.reset()
            } else {
                const errorData = await response.json()
                const errorMessage = errorData.error || response.statusText
                throw new Error(errorMessage)
            }
        } catch (error) {
            toast.success('Error al enviar los datos')
            console.error('Ha ocurrido un error:', error)
        }
    }
    return { sendDataHandler, formRef, formToShow }
}

export default useFormDisplay
