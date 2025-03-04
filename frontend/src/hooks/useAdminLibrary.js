import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { isSuccessToast } from '../utils/toast.js'

const API_BASE_URL = import.meta.env.VITE_API_URL

const useAdminLibrary = () => {
  const MAX_CHARACTERS = 1000
  const [libraryData, setLibraryData] = useState({
    lactationResources: [],
    lactationBooks: '',
    pregnancyResources: [],
    pregnancyBooks: '',
    parentingBooks: '',
    parentingResources: [],
    nutritionBlogs: [],
    nutritionBooks: '',
    archiveBlogs: [],
  })

  useEffect(() => {
    const toastId = toast.loading('Cargando datos...')

    fetch(`${API_BASE_URL}/get-home-data`)
      .then((response) => response.json())
      .then((data) => {
        const { library } = data.form
        setLibraryData(library)
        isSuccessToast(true, 'Datos cargados correctamente', toastId)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error)
        isSuccessToast(false, 'Error al cargar los datos', toastId)
      })
  }, [])

  const handleChange = (field, value) => {
    if (value.length > MAX_CHARACTERS) {
      toast.warn(`El campo no puede superar los ${MAX_CHARACTERS} caracteres.`)
      return
    }
    setLibraryData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const areFieldsValid = () => {
    return Object.keys(libraryData).every((field) => {
      const value = libraryData[field]

      if (Array.isArray(value)) {
        return value.every((resource) => {
          console.log('datos', resource.title)
          return resource.title.es.trim() !== '' && resource.link.trim() !== ''
        })
      }

      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!areFieldsValid()) {
      toast.error('Por favor, completa todos los campos antes de enviar.')
      return
    }

    const toastId = toast.loading('Guardando cambios...')

    try {
      const updateData = { library: libraryData }

      const response = await fetch(`${API_BASE_URL}/update-home-data`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta de la red')
      }

      const data = await response.json()
      console.log('Datos de la biblioteca actualizados exitosamente:', data)
      isSuccessToast(true, 'Los cambios se han guardado exitosamente.', toastId)
    } catch (error) {
      console.error('Error al actualizar datos:', error)
      isSuccessToast(false, 'Hubo un error al guardar los cambios.', toastId)
    }
  }

  return {
    libraryData,
    handleChange,
    handleSubmit,
    setLibraryData,
  }
}

export default useAdminLibrary
