import useEditForm from '../hooks/useEditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import './EditForm.css'

const EditForm = ({
  setEditingForm,
  selectedForm,
  setForms,
  setSelectedForm,
  setPublishedForm,
  publishedForm,
}) => {
  const { register, handleSubmit, onSubmit, fields, append, remove } =
    useEditForm(
      setEditingForm,
      selectedForm,
      setForms,
      setSelectedForm,
      setPublishedForm
    )

  const publishFormIndex = Array.isArray(publishedForm)
    ? publishedForm.findIndex((form) => form.formId === selectedForm?.formId)
    : -1

  const handleFormSubmit = (data) => {
    console.log('data', data)
    const modifiedData = {
      ...data,
      formName: data.formName.es,
      fields: data.fields.map((field) => ({ ...field, label: field.label.es })),
    }
    console.log('modifiedData', modifiedData)
    onSubmit(modifiedData, publishFormIndex)
  }
  return (
    <div className='contenedor-editor-formularios'>
      <h2>Editor de Formularios</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='formName' style={{ marginRight: '10px' }}>
            Nombre del Formulario:
          </label>
          <span style={{ marginRight: '10px' }}>
            {selectedForm?.formName.es}
          </span>
          <input type='hidden' {...register('formName', { required: true })} />
        </div>

        <div>
          {fields?.map(
            (field, index) =>
              field.label.es !== 'partner' &&
              field.label.es !== 'Partner' && (
                <div key={field.id} style={{ marginBottom: '20px' }}>
                  <input
                    className='input-editor-formularios'
                    {...register(`fields[${index}].label.es`)}
                    placeholder='Etiqueta del Campo'
                    style={{ marginRight: '10px' }}
                  />
                  <select
                    className='select-editor-formularios'
                    {...register(`fields[${index}].type`)}
                  >
                    <option value='text'>Texto</option>
                    <option value='number'>Número</option>
                    <option value='email'>Email</option>
                    {/* <option value="password">Contraseña</option> */}
                  </select>
                  <button
                    className='boton-eliminar-campo-editar-formulario'
                    type='button'
                    onClick={() => remove(index)}
                    style={{ marginLeft: '10px' }}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </button>
                </div>
              )
          )}
        </div>

        <button
          className='boton-añadir-campo-editar-formulario'
          type='button'
          onClick={() => append({ label: '', type: 'text' })}
          style={{ marginRight: '10px' }}
        >
          <FontAwesomeIcon icon={faPlus} /> Añadir Campo
        </button>

        <button
          className='boton-cerrar-editor'
          onClick={() => {
            setEditingForm(false)
            setEditingForm(null)
          }}
        >
          <FontAwesomeIcon icon={faTimes} /> Cerrar editor
        </button>
        <button className='boton-actualizar-formulario' type='submit'>
          Actualizar formulario
        </button>
      </form>
    </div>
  )
}

export default EditForm
