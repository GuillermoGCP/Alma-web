import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

const useEditForm = (
    setEditingForm,
    selectedForm,
    setForms,
    setSelectedForm,
    setPublishedForm
) => {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: selectedForm,
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    })

    useEffect(() => {
        reset(selectedForm)
    }, [selectedForm, reset])

    const onSubmit = async (data, jsonNumber) => {
        try {
            setEditingForm(false)
            const jsonData = {
                formId: selectedForm.formId,
                formName: data.formName,
                fields: data.fields,
            }
            const updateFormUrl =
                import.meta.env.VITE_API_URL + '/update-form/updateMongo'

            const updateResponse = await fetch(updateFormUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })

            if (updateResponse.ok) {
                const dataFromBack = await updateResponse.json()
                console.log(dataFromBack.message)

                setForms((prevData) => {
                    const updatedData = Object.entries(prevData).map(
                        ([key, value]) => {
                            if (
                                key === Object.keys(dataFromBack.apdatedForm)[0]
                            ) {
                                return [key, dataFromBack.apdatedForm[key]]
                            } else {
                                return [key, value]
                            }
                        }
                    )
                    return Object.fromEntries(updatedData)
                })

                setSelectedForm(jsonData)

                const checkPublishedResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/check-is-published/${
                        selectedForm.formId
                    }/${Number(jsonNumber) + 1}`
                )

                if (checkPublishedResponse.ok) {
                    const publishedData = await checkPublishedResponse.json()
                    if (publishedData.isPublished) {
                        try {
                            const publishResponse = await fetch(
                                `${
                                    import.meta.env.VITE_API_URL
                                }/get-published-form/${Number(jsonNumber) + 1}`
                            )

                            if (publishResponse.ok) {
                                console.log('Publicación actualizada')
                                const publishedFormData =
                                    await publishResponse.json()
                                setPublishedForm((prevData) => {
                                    const newData = [...prevData]
                                    newData[jsonNumber] = publishedFormData.form
                                    return newData
                                })
                            } else {
                                console.error(
                                    'Error al actualizar la publicación'
                                )
                            }
                        } catch (error) {
                            console.error('Ha ocurrido un error:', error)
                        }
                    }
                } else {
                    console.error(
                        'Ha habido un error al verificar si está publicado'
                    )
                }
            } else {
                console.error('Error al actualizar el formulario')
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        } finally {
            reset()
        }
    }
    return {
        register,
        handleSubmit,
        reset,
        control,
        onSubmit,
        fields,
        append,
        remove,
    }
}
export default useEditForm
