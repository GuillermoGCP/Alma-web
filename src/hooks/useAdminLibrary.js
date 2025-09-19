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
    const ac = new AbortController()
    const toastId = toast.loading('Cargando datos...')

    fetch(`${API_BASE_URL}/get-home-data`, {
      credentials: 'include',
      signal: ac.signal,
      headers: { Accept: 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        // Soporta { form } o { data: { form } }; si no hay form, no pisa tu estado.
        const form = data?.form ?? data?.data?.form ?? null
        const lib =
          form && typeof form === 'object' ? form.library ?? null : null

        if (lib && typeof lib === 'object') {
          setLibraryData(lib)
          isSuccessToast(true, 'Datos cargados correctamente', toastId)
        } else {
          // No sobreescribimos el estado inicial si no hay datos válidos
          isSuccessToast(
            false,
            'No hay datos de biblioteca en el backend',
            toastId
          )
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.error('Error al obtener los datos:', err)
        isSuccessToast(false, 'Error al cargar los datos', toastId)
      })

    return () => ac.abort()
  }, [])

  const handleChange = (field, value) => {
    // Solo limitamos longitud para strings
    if (typeof value === 'string' && value.length > MAX_CHARACTERS) {
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
        // Evita reventar si falta algo en algún item
        return value.every(
          (resource) =>
            resource?.title?.es?.trim?.() && resource?.link?.trim?.()
        )
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      })

      if (!response.ok) throw new Error('Error en la respuesta de la red')

      await response.json()
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
