import { useForm, useFieldArray } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

const useFormBuilder = (setForms) => {
  const { register, handleSubmit, control, reset } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  })

  const onSubmit = async (data) => {
    const generatedFormId = uuidv4()
    const fieldsPayload = Array.isArray(data?.fields) ? data.fields : []

    const jsonData = {
      formId: generatedFormId,
      formName: data.formName,
      fields: [...fieldsPayload, { label: 'partner', type: 'select' }],
    }

    const saveForm = `${import.meta.env.VITE_API_URL}/create-form`
    const toastId = toast.loading('Guardando formulario...')

    try {
      const response = await fetch(saveForm, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        const message = errorPayload?.message || 'No se pudo crear el formulario'
        throw new Error(message)
      }

      const dataFromBack = await response.json()
      if (dataFromBack?.form) {
        setForms((prevData) => ({
          ...(prevData || {}),
          ...dataFromBack.form,
        }))
      }

      toast.update(toastId, {
        render: 'Formulario creado con exito',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      })

      reset()
    } catch (error) {
      toast.update(toastId, {
        render: error.message || 'Error al crear el formulario',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      console.error('Error al crear formulario:', error)
    }
  }

  return {
    onSubmit,
    register,
    handleSubmit,
    control,
    reset,
    fields,
    append,
    remove,
  }
}
export default useFormBuilder
