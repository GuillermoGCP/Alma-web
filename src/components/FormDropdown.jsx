import useFormDropdown from '../hooks/useFormDropdown'
import CustomDialog from './customDialog.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './FormDropdown.css'
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
    refreshPublishedActivities,
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

  const currentPublishedForm =
    publishFormIndex !== -1 && Array.isArray(publishedForm)
      ? publishedForm[publishFormIndex]
      : undefined

  const associatedActivity =
    currentPublishedForm?.eventId && Array.isArray(publishedActivities)
      ? publishedActivities.find(
          (activity) => activity.id === currentPublishedForm.eventId
        )
      : undefined

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
            const name =
              currentLang === 'es'
                ? form.formName.es
                : form.formName.gl || form.formName.es // Fallback a ES si GL está vacío
            return (
              <li key={index} onClick={() => handleSelectForm(formId)}>
                {name || '(Sin título)'}
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
              : selectedForm?.formName.gl || selectedForm?.formName.es}
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
                  const lbl = field.label.gl || field.label.es // Fallback a ES si GL está vacío
                  if (lbl !== 'Partner' && lbl !== 'partner')
                    return <li key={index}>{lbl}</li>
                })}
          </ul>

          {publishFormIndex !== -1 &&
          currentPublishedForm &&
          Object.keys(currentPublishedForm).length > 0 ? (
            <>
              <p className='texto-asociado-evento'>
                {`Asociado al evento: ${
                  associatedActivity?.summary ||
                  '(evento no disponible)'
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
                  const selectElement = e.target.elements.activity
                  const selectedOption = selectElement?.selectedOptions?.[0]
                  const jsonNumber = selectElement?.value || ''
                  const eventId = selectedOption?.dataset?.eventId || ''

                  if (!jsonNumber) {
                    window.alert('Selecciona un evento para publicar.')
                    return
                  }

                  if (!eventId) {
                    window.alert(
                      'No se pudo identificar el evento seleccionado. Actualiza la lista e inténtalo de nuevo.'
                    )
                    return
                  }

                  publishHandler(selectedForm?.formId, jsonNumber, eventId)
                }}
              >
                <select
                  className='selector-evento-formularios'
                  name='activity'
                  id='activity'
                  onFocus={refreshPublishedActivities}
                >
                  <option value=''>Seleccione evento</option>
                  {publishedActivities.map((activity, index) => {
                    return (
                      <option
                        key={activity.id || index}
                        value={index + 1}
                        data-event-id={activity.id || ''}
                      >
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
