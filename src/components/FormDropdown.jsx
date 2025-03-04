import useFormDropdown from '../hooks/useFormDropdown'
import CustomDialog from './customDialog.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './FormDropdown.css'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const FormDropdown = ({
  forms,
  setForms,
  setPublishedForm,
  publishedForm,
  setEditingForm,
  setSelectedForm,
  selectedForm,
}) => {
  //Para textos dinámicos en el idioma seleccionado:
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const {
    handleSelectForm,
    publishHandler,
    unPublishHandler,
    handleYes,
    handleNo,
    handleCancel,
    isModalOpen,
    openModal,
    searchTerm,
    setSearchTerm,
    filteredFormEntries,
    editFormHandler,
    publishedActivities,
  } = useFormDropdown(
    forms,
    setForms,
    setPublishedForm,
    setEditingForm,
    setSelectedForm,
    publishedForm,
    selectedForm
  )

  const publishFormIndex =
    Array.isArray(publishedForm) && selectedForm
      ? publishedForm.findIndex((form) => form.formId === selectedForm.formId)
      : -1

  return (
    <div className='contenedor-seleccione-formulario'>
      <div className='contenedor-titulo-buscador'>
        <h2>Busca y selecciona un formulario...</h2>
        <input
          className='buscar-formulario-input'
          type='text'
          placeholder='🔍 Busca un formulario...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='contenedor-listado-formularios'>
        <ul>
          {filteredFormEntries?.map(([formId, form], index) => {
            return currentLang === 'es' ? (
              <li key={index} onClick={() => handleSelectForm(formId)}>
                {form.formName.es}
              </li>
            ) : (
              <li key={index} onClick={() => handleSelectForm(formId)}>
                {form.formName.gl}
              </li>
            )
          })}
        </ul>
      </div>
      {selectedForm && (
        <div>
          <h3>
            Formulario:
            {currentLang === 'es'
              ? selectedForm?.formName.es
              : selectedForm?.formName.gl}
          </h3>
          <ul>
            {currentLang === 'es'
              ? selectedForm?.fields.map((field, index) => {
                  if (
                    field.label.es !== 'Partner' &&
                    field.label.es !== 'partner'
                  )
                    return <li key={index}>{field.label.es}</li>
                })
              : selectedForm?.fields.map((field, index) => {
                  if (
                    field.label.gl !== 'Partner' &&
                    field.label.gl !== 'partner'
                  )
                    return <li key={index}>{field.label.gl}</li>
                })}
          </ul>

          {publishFormIndex !== -1 && publishedActivities[publishFormIndex] ? (
            <>
              <p className='texto-asociado-evento'>
                {`Asociado al evento: ${
                  publishedActivities[publishFormIndex] &&
                  publishedActivities[publishFormIndex]?.summary
                }`}
              </p>
              <button
                className='boton-despublicar-formulario-dropdown'
                onClick={() => unPublishHandler(publishFormIndex.toString())}
              >
                Despublicar
              </button>
            </>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  publishHandler(
                    selectedForm?.formId,
                    e.target.elements.activity.value
                  )
                }}
              >
                <select
                  className='selector-evento-formularios'
                  name='activity'
                  id='activity'
                >
                  <option value=''>Seleccione evento</option>
                  {publishedActivities.map((activity, index) => {
                    return (
                      <option key={index} value={index + 1}>
                        {activity.summary}
                      </option>
                    )
                  })}
                </select>
                <button className='boton-publicar-formulario-dropdown'>
                  Publicar formulario
                </button>
              </form>
            </>
          )}
          <button
            className='boton-editar-formulario-dropdown'
            onClick={editFormHandler}
          >
            <i className='fas fa-edit icon'></i> Editar
          </button>
          <button
            className='boton-eliminar-campo-editar-formulario'
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </button>
          {isModalOpen && (
            <CustomDialog
              onYes={() =>
                handleYes(
                  selectedForm?.formId,
                  selectedForm?.formName.es,
                  publishFormIndex
                )
              }
              onNo={() => handleNo(selectedForm?.formId, publishFormIndex)}
              onCancel={handleCancel}
              message={
                '¿Borrar hoja de cálculo asociada? (Se perderán los datos de los asistentes)'
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

export default FormDropdown
