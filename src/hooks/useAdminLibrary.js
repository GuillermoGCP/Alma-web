import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { isSuccessToast } from '../utils/toast.js'

const API_BASE_URL = import.meta.env.VITE_API_URL

const useAdminLibrary = () => {
  const MAX_CHARACTERS = 1000
  const SECTION_FIELDS = {
    lactancia: ['lactationResources', 'lactationBooks'],
    embarazo: ['pregnancyResources', 'pregnancyBooks'],
    crianza: ['parentingResources', 'parentingBooks'],
    alimentacion: ['nutritionBlogs', 'nutritionBooks'],
    hemeroteca: ['archiveBlogs'],
  }
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

  const normalizeResource = (resource) => {
    const title =
      resource?.title && typeof resource.title === 'object'
        ? resource.title
        : { es: resource?.title ?? '' }
    return {
      ...resource,
      title: {
        es: title?.es ?? '',
        gl: title?.gl ?? '',
      },
      link: resource?.link ?? '',
    }
  }

  const normalizeLibrary = (lib) => ({
    lactationResources: (lib?.lactationResources ?? []).map(normalizeResource),
    lactationBooks: lib?.lactationBooks ?? '',
    pregnancyResources: (lib?.pregnancyResources ?? []).map(normalizeResource),
    pregnancyBooks: lib?.pregnancyBooks ?? '',
    parentingResources: (lib?.parentingResources ?? []).map(normalizeResource),
    parentingBooks: lib?.parentingBooks ?? '',
    nutritionBlogs: (lib?.nutritionBlogs ?? []).map(normalizeResource),
    nutritionBooks: lib?.nutritionBooks ?? '',
    archiveBlogs: (lib?.archiveBlogs ?? []).map(normalizeResource),
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
          setLibraryData(normalizeLibrary(lib))
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

  const buildSectionPayload = (sectionKey, data) => {
    if (!sectionKey) return data
    const fields = SECTION_FIELDS[sectionKey] ?? []
    return fields.reduce((acc, field) => {
      acc[field] = data[field]
      return acc
    }, {})
  }

  const pruneEmptyResources = (resources) =>
    resources.filter((resource) => {
      const title = resource?.title?.es?.trim?.() ?? ''
      const link = resource?.link?.trim?.() ?? ''
      return title !== '' || link !== ''
    })

  const areFieldsValid = (data) => {
    return Object.keys(data).every((field) => {
      const value = data[field]

      if (Array.isArray(value)) {
        // Evita reventar si falta algo en algún item
        return value.every(
          (resource) =>
            resource?.title?.es?.trim?.() && resource?.link?.trim?.()
        )
      }

      if (typeof value === 'string') {
        return true
      }

      return true
    })
  }

  const handleSubmit = async (e, sectionKey = null) => {
    e.preventDefault()
    const payloadLibrary = buildSectionPayload(sectionKey, libraryData)
    const normalizedPayload = {
      ...payloadLibrary,
      ...Object.fromEntries(
        Object.entries(payloadLibrary).map(([key, value]) => {
          if (Array.isArray(value)) {
            return [key, pruneEmptyResources(value).map(normalizeResource)]
          }
          return [key, value ?? '']
        })
      ),
    }

    if (!areFieldsValid(normalizedPayload)) {
      toast.error('Por favor, completa todos los campos antes de enviar.')
      return
    }

    const toastId = toast.loading('Guardando cambios...')

    try {
      const updateData = { library: normalizedPayload }

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
    MAX_CHARACTERS,
  }
}

export default useAdminLibrary
