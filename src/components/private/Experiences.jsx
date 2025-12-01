import useExperiences from '../../hooks/useExperiences'
import EditableExperience from './Modals/EditableExperience'
import './AdminHome.css'
import { useEffect } from 'react'
import getLocalStorageItem from '../../utils/getLocalStorageItem'

// URL de la imagen proporcionada (icono pecho)
const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'

const Experiences = ({
  homeData,
  setHomeData,
  setCharactersRemaining,
  visibleSection,
  charactersRemaining,
  MAX_CHARACTERS,
}) => {
  //Esto es para el condicional de los datos dinámicos traducidos llegados desde el backend:
  const currentLang = getLocalStorageItem('language')

  const {
    handleExperienceDelete,
    selectedExperience,
    experienceFileInputRef,
    newExperience,
    handleExperienceUpdate,
    handleSaveSelection,
    handleAddExperience,
    closeModal,
    modalOpen,
    checkedExperiences,
    setSelectedExperience,
    setModalOpen,
    handleExperienceChange,
    imageName,
    handleCheckboxChange,
  } = useExperiences(setHomeData, setCharactersRemaining, MAX_CHARACTERS)

  return (
    <div
      className={`section ${visibleSection === 'experiences' ? 'visible' : ''}`}
    >
      <h2>Editar experiencias reales</h2>
      <p className='texto-descriptivo-experiencias'>
        Para poder compartir una experiencia en la página web, primero debes
        crear una:
      </p>
      <label htmlFor='experienceText'>1. Añade una descripción:</label>
      <textarea
        id='experienceText'
        name='text'
        value={newExperience.text}
        onChange={handleExperienceChange}
        maxLength={MAX_CHARACTERS}
      />
      <p className='charactersRemaining'>
        {charactersRemaining} caracteres restantes (Máximo 1800 caracteres)
      </p>

      <div>
        <label htmlFor='experienceImage'>2. Añade una imagen:</label>
        <button
          className='experience-buttons'
          onClick={() => {
            experienceFileInputRef.current.click()
          }}
        >
          Seleccionar imagen
        </button>
        <input
          ref={experienceFileInputRef}
          id='experienceImage'
          type='file'
          accept='image/*'
          onChange={handleExperienceChange}
          style={{ display: 'none' }}
          value={''}
        />
        {imageName && <p>Imagen seleccionada: {imageName}</p>}
      </div>

      <button className='admin-btn-exp' onClick={handleAddExperience}>
        <i className='fas fa-plus'></i> Añadir experiencia
      </button>
      <p className='texto-descriptivo-experiencias'>
        Una vez añadida la experiencia, selecciona las experiencias del listado
        que desees y haz clic en publicar para compartirlas{' '}
        <i className='fas fa-arrow-down'></i>
      </p>
      <div className='fondo-lista-experiencias'>
        <h3>Listado de experiencias actualmente creadas</h3>

        <p>
          (Haz clic en la imagen para editar cualquier experiencia publicada)
        </p>
        <ol className='list-exp'>
          {homeData.experiences && homeData.experiences.length > 0 ? (
            homeData.experiences.map((experience) =>
              experience ? (
                <li key={experience.id}>
                  <div className='contenedor-experiencia'>
                    <img
                      className='imagen-experiencias-dashboard'
                      src={
                        experience.image !== 'Sin imagen'
                          ? experience.image
                          : DEFAULT_IMAGE_URL
                      }
                      alt={'Experience Image'}
                      onClick={() => {
                        setSelectedExperience(experience)
                        setModalOpen(true)
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <p className='texto-experiencias-dashboard'>
                      {experience.text.es}
                    </p>
                  </div>
                  {/* Checkbox para seleccionar la experiencia */}
                  <div className='contenedor-checkbox-experiencias'>
                    <input
                      className='checkbox-experiencias-publicadas'
                      type='checkbox'
                      id={`checkbox-${experience.id}`}
                      checked={checkedExperiences.includes(experience.id)}
                      onChange={() => handleCheckboxChange(experience.id)}
                      disabled={
                        !checkedExperiences.includes(experience.id) &&
                        checkedExperiences.length >= 4
                      }
                    />
                    <label htmlFor={`checkbox-${experience.id}`}>
                      {' '}
                      <i className='fas fa-check'></i>{' '}
                    </label>
                  </div>
                </li>
              ) : null
            )
          ) : (
            <p className='no-hay-experiencias-mensaje'>
              No hay experiencias disponibles.
            </p>
          )}
        </ol>
        <button
          className='boton-publicar-experiencias'
          onClick={handleSaveSelection}
        >
          Publicar experiencias seleccionadas
        </button>
      </div>
      {modalOpen && selectedExperience && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            {selectedExperience && (
              <EditableExperience
                experienceData={selectedExperience}
                onUpdate={handleExperienceUpdate}
                onDelete={handleExperienceDelete}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Experiences
