import { useState, useEffect, useCallback } from 'react'
import { getCalendarEvents } from '../services/api'
import { useTranslation } from 'react-i18next'
import { loadPublishedActivities } from '../utils/formDropdownUtils'

const useFormDropdown = (
  forms,
  setForms,
  setPublishedForm,
  setEditingForm,
  setSelectedForm
) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [publishedActivities, setPublishedActivities] = useState([])
  const { i18n } = useTranslation()

  // Para textos dinámicos en el idioma seleccionado:
  const currentLang = i18n.language

  // Obtener los formularios creados:
  useEffect(() => {
    const controller = new AbortController()
    const fetchForms = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get-all-forms`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('No se pudieron obtener los formularios')
        }

        const data = await response.json()
        const fetchedForms = data?.forms || {}

        if (controller.signal.aborted) {
          return
        }

        setForms((prevForms) => {
          if (!prevForms || Object.keys(prevForms).length === 0) {
            return fetchedForms
          }

          return {
            ...fetchedForms,
            ...prevForms,
          }
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        console.error('Error al obtener los formularios:', error)
      }
    }

    fetchForms()

    return () => {
      controller.abort()
    }
  }, [setForms])

  // Los eventos publicados (para asociarlos a las hojas al publicar)
  const fetchPublishedActivities = useCallback(async () => {
    await loadPublishedActivities(getCalendarEvents, setPublishedActivities)
  }, [])

  useEffect(() => {
    fetchPublishedActivities()
  }, [fetchPublishedActivities])

  // Seleccionar un formulario de la lista:
  const handleSelectForm = (formId) => {
    const data = forms?.[formId]
    if (!data) return
    const newData = { ...data, formId }
    setSelectedForm(newData)
  }

  // Convierto el objeto de formularios a una matriz y omito el primer objeto (cabeceras):
  let formEntries = []
  if (forms) {
    formEntries = Object.entries(forms)
  }

  // Filtro los datos por el buscador (con fallbacks gl || es):
  const needle = searchTerm.toLowerCase().trim()
  const filteredFormEntries =
    currentLang === 'es'
      ? formEntries
          .slice(1)
          .filter(([_, form]) =>
            (form?.formName?.es || '').toLowerCase().includes(needle)
          )
      : formEntries
          .slice(1)
          .filter(([_, form]) =>
            (form?.formName?.gl || form?.formName?.es || '')
              .toLowerCase()
              .includes(needle)
          )

  // Publicar formulario:
  const publishHandler = async (formId, jsonNumber, eventId) => {
    try {
      if (!formId || !jsonNumber || !eventId) {
        throw new Error('Faltan datos para publicar el formulario.')
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/get-form/${formId}/publish/${jsonNumber}?eventId=${encodeURIComponent(
          eventId
        )}`
      )

      if (response.ok) {
        const data = await response.json()
        setPublishedForm((prevData) => {
          const newData = [...prevData]
          newData.splice(Number(jsonNumber) - 1, 1, data.form)
          return newData
        })
      } else {
        console.error('Error al publicar el formulario')
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error)
    }
  }

  // Despublicar formulario:
  const unPublishHandler = async (jsonNumber) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/unpublish-form/${
          Number(jsonNumber) + 1
        }`
      )

      if (response.ok) {
        await response.json()
        setPublishedForm((prevData) => {
          const newData = [...prevData]
          newData[jsonNumber] = {}
          return newData
        })
      } else {
        console.error('Error al despublicar el formulario')
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error)
    }
  }

  const checkIsPublishHandler = async (id, jsonNumber) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/check-is-published/${id}/${
        Number(jsonNumber) + 1
      }`
    )
    if (response.ok) {
      const data = await response.json()
      if (data.isPublished) {
        const unPublish = window.confirm(
          'El formulario esta publicado, quiere despublicarlo?'
        )
        if (unPublish) {
          unPublishHandler(jsonNumber)
        }
      }
    } else {
      console.error('Ha habido un error')
    }
  }

  // Handlers del modal customDialog:
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleYes = async (id, sheetName, jsonNumber) => {
    // Compruebo si el formulario que se quiere borrar está publicado:
    checkIsPublishHandler(id, jsonNumber)

    // Sigo con la lógica de borrado:
    const url = `${
      import.meta.env.VITE_API_URL
    }/delete-form/${id}/deleteSheet/${sheetName}`
    deleteForm(id, url)
    closeModal()
  }

  const handleNo = (id, jsonNumber) => {
    checkIsPublishHandler(id, jsonNumber)
    const url = `${import.meta.env.VITE_API_URL}/delete-form/${id}`
    deleteForm(id, url)
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  // Borrar un formulario:
  const deleteForm = async (formId, url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' })
      if (response.ok) {
        await response.json()
        setSelectedForm(null)

        // Actualizo el estado para que se reflejen los cambios inmediatamente:
        const filteredForms = formEntries.filter(([key]) => key !== formId)
        if (filteredForms.length > 0) {
          // Reconstruyo el nuevo objeto de formularios con los valores filtrados:
          const newList = Object.fromEntries(filteredForms)
          setForms(newList)
        }
      } else {
        console.error('Error al borrar el formulario')
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error)
    }
  }

  const editFormHandler = () => {
    setEditingForm(true)
  }

  return {
    handleSelectForm,
    formEntries,
    publishHandler,
    unPublishHandler,
    isModalOpen,
    openModal,
    closeModal,
    handleYes,
    handleNo,
    handleCancel,
    searchTerm,
    setSearchTerm,
    filteredFormEntries,
    editFormHandler,
    publishedActivities,
    refreshPublishedActivities: fetchPublishedActivities,
  }
}
export default useFormDropdown
