import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faTrash,
  faTimes,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import './EditableExperience.css'
import getLocalStorageItem from '../../../utils/getLocalStorageItem'

const EditableExperience = ({
  experienceData,
  onClose,
  onUpdate,
  onDelete,
}) => {
  //Esto es para el condicional de los datos dinámicos traducidos llegados desde el backend:
  const currentLang = getLocalStorageItem('language')

  if (!experienceData) {
    return null
  }

  const prevImage = experienceData.image

  const [text, setText] = useState(experienceData.text.es)
  const [image, setImage] = useState(experienceData.image)

  const handleUpdate = () => {
    const updatedExperience = {
      ...experienceData,
      text,
      image: image,
    }
    onUpdate(updatedExperience, prevImage)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content-experiencias'
        onClick={(e) => e.stopPropagation()}
      >
        <li style={{ listStyle: 'none' }}>
          <div className='experienceData-text'>
            <p>Texto actual:</p>
            {experienceData.text.es}
          </div>
          {/* Nueva imagen */}
          <div className='new-image-modal'>
            <h3>
              Puedes modificar la experiencia aquí
              <FontAwesomeIcon icon={faArrowDown} />
            </h3>
          </div>
          <div className='contenedor-edicion-experiencia'>
            <p>Modifica la imagen:</p>
            <label htmlFor='imageModal' className='file-label-modal'>
              <i className='fas fa-upload'></i>{' '}
              <span>Seleccionar archivo...</span>
            </label>
            <input
              type='file'
              id='imageModal'
              name='image'
              onChange={handleImageChange}
              className='file-input-modal'
            />

            <p className='modifica-texto-modal'>Modifica el texto:</p>
            <textarea
              className='model-experiencia-nueva-textarea'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdate}
            className='boton-modificar-modal-experiencias'
          >
            <FontAwesomeIcon icon={faEdit} /> Modificar
          </button>
          <button
            onClick={() => onDelete(experienceData.id)}
            className='boton-eliminar-modal-experiencias'
          >
            <FontAwesomeIcon icon={faTrash} /> Borrar
          </button>
          <button onClick={onClose} className='boton-cerrar-modal-experiencias'>
            <FontAwesomeIcon icon={faTimes} /> Cerrar modal
          </button>
        </li>
      </div>
    </div>
  )
}

export default EditableExperience
