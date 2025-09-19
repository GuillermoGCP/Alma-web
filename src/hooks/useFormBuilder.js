import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

const useFormBuilder = (setForms) => {
  let formId
  const { register, handleSubmit, control, reset } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  })

  const onSubmit = (data) => {
    formId = uuidv4()
    const jsonData = {
      formId,
      formName: data.formName,
      fields: [...data.fields, { label: 'partner', type: 'select' }],
    }
    const saveForm = import.meta.env.VITE_API_URL + '/create-form'
    try {
      const response = fetch(saveForm, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((dataFromBack) => {
          if (dataFromBack?.sheetExists) {
          } else {
          }
          setForms((prevData) => {
            return { ...prevData, ...dataFromBack.form }
          })
        })

      reset()
    } catch (error) {}
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
    formId,
  }
}
export default useFormBuilder
