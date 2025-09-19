import React, { useEffect, useState } from 'react'
import {
  deleteCollaboratorService,
  newCollaboratorService,
  updateCollaboratorService,
} from '../../services/api'
import { toast } from 'react-toastify'
import { isSuccessToast } from '../../utils/toast'
import ConfirmationModal from '../ConfirmationModal'

const EditCollaboratorForm = ({ collaboratorData, onSuccess }) => {
  const [collaborator, setCollaborator] = useState(collaboratorData)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('') // Vista previa de la imagen
  const [imageName, setImageName] = useState('') // Nombre de la imagen del backend
  const [showModal, setShowModal] = useState(false)

  // URL de la imagen proporcionada (icono pecho)
  const DEFAULT_IMAGE_URL =
    'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'

  useEffect(() => {
    setCollaborator(collaboratorData)

    // Si hay una imagen en el backend, cargar el nombre y la vista previa
    if (collaboratorData.image && collaboratorData.image !== 'Sin imagen') {
      const imageUrl = collaboratorData.image
      setImagePreview(imageUrl)
      setImageName(collaboratorData.image)
    } else {
      // Si no hay imagen en el colaborador, usar la imagen por defecto
      setImagePreview(DEFAULT_IMAGE_URL)
      setImageName('Imagen por defecto')
    }

    // Limpiar el campo de archivo cuando cambia el colaborador
    setSelectedFile(null)
  }, [collaboratorData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCollaborator((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)

    // Mostrar la vista previa de la nueva imagen seleccionada
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setImageName(file.name)
    } else {
      // Si no hay archivo seleccionado, restablecer la vista previa
      setImagePreview(DEFAULT_IMAGE_URL)
      setImageName('Imagen por defecto')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setShowModal(true) // Muestra el modal de confirmación
  }

  const confirmDelete = async () => {
    setShowModal(false) // Cierra el modal
    const isTeam =
      collaborator.hierarchy === 'Miembro del equipo' ? 'true' : 'false'
    try {
      const processToast = toast.loading('Eliminando colaborador...')
      const responseMsg = await deleteCollaboratorService(
        collaborator.id,
        isTeam,
        collaboratorData.image
      )

      if (responseMsg.error) {
        throw new Error(responseMsg.error)
      }

      isSuccessToast(true, 'Colaborador eliminado con éxito', processToast)
      onSuccess()
    } catch (error) {
      toast.dismiss()
      toast.error(`Error al eliminar colaborador: ${error.message}`)
    }
  }

  const cancelDelete = () => {
    setShowModal(false) // Cierra el modal si el usuario cancela
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isTeam =
      collaborator.hierarchy === 'Miembro del equipo' ? 'true' : 'false'

    const formData = new FormData()
    formData.append('name', collaborator.name)
    formData.append('surname', collaborator.surname)
    formData.append('role', collaborator.role)
    formData.append('description', collaborator.description)

    if (selectedFile) {
      formData.append('collaboratorImage', selectedFile) // Añadir nueva imagen si se ha seleccionado
    }

    const processToast = toast.loading('Guardando cambios...')

    try {
      if (collaborator.id) {
        // Actualizar colaborador existente

        const responseMsg = await updateCollaboratorService(
          collaborator.id,
          isTeam,
          collaboratorData.image, // Mantenemos esto para tener la imagen anterior
          formData // Aquí enviamos todos los datos, incluida la nueva imagen si se ha seleccionado
        )

        if (responseMsg.error) {
          throw new Error(responseMsg.error)
        }

        isSuccessToast(true, 'Colaborador actualizado con éxito', processToast)
        onSuccess()
      } else {
        // Crear un nuevo colaborador
        const responseMsg = await newCollaboratorService(formData)

        if (responseMsg.error) {
          throw new Error(responseMsg.error)
        }

        isSuccessToast(true, 'Nuevo colaborador creado con éxito', processToast)

        onSuccess()
      }

      // Limpiar el campo de archivo después de guardar
      setSelectedFile(null)
      setImagePreview('') // Limpiar vista previa
      setImageName('') // Limpiar nombre de la imagen
    } catch (error) {
      toast.dismiss()
      toast.error(`Error al guardar colaborador: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Contenedor del grid */}
      <div className='collaborator-form'>
        {/* Previsualización de la imagen */}
        <div className='image-preview'>
          <label>Previsualización imagen: </label>
          {imageName ? (
            <div>
              <img
                src={imagePreview}
                alt='Vista previa de la imagen'
                width='200px'
              />
              <p className='image-name-description'>{imageName}</p>
            </div>
          ) : (
            <p className='texto-descriptivo-accion'>Sin foto guardada</p>
          )}
        </div>

        {/* Nueva imagen */}
        <div className='new-image'>
          <p className='texto-descriptivo-accion'>
            Nueva imagen (si quieres cambiarla):
          </p>
          <label htmlFor='image' className='file-label'>
            <i className='fas fa-upload'></i> Seleccionar archivo...
          </label>
          <input
            type='file'
            id='image'
            name='image'
            onChange={handleFileChange}
            className='file-input'
          />
        </div>

        {/* Nombre */}
        <div className='name'>
          <label htmlFor='name'>Nombre:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={collaborator.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        {/* Apellidos */}
        <div className='surname'>
          <label htmlFor='surname'>Apellidos:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            value={collaborator.surname || ''}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rol */}
        <div className='role'>
          <label htmlFor='role'>Rol:</label>
          <input
            type='text'
            id='role'
            name='role'
            value={collaborator.role?.es || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Descripción */}
      <div className='description'>
        <label htmlFor='description'>Descripción:</label>
        <input
          type='text'
          id='description'
          name='description'
          value={collaborator?.description?.es || ''}
          onChange={handleChange}
          required
        />
      </div>

      {/* Contenedor para los botones fuera del grid */}
      <div className='buttons-container'>
        <button type='submit' className='confirm-btn'>
          <i className='fas fa-save'></i> Guardar Cambios
        </button>
        <button onClick={handleDelete} className='boton-cancelar-dashboard'>
          <i className='fas fa-trash-alt'></i> Eliminar
        </button>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`¿Estás seguro de que deseas eliminar a ${collaborator.name}? Esta acción no se puede deshacer.`}
      />
    </form>
  )
}

export default EditCollaboratorForm
