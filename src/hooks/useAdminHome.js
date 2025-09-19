import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

const useAdminHome = (setHomeData) => {
  const MAX_CHARACTERS = 1800
  const [visibleSection, setVisibleSection] = useState(null)
  const [file, setFile] = useState(null)
  const [charactersRemaining, setCharactersRemaining] = useState(MAX_CHARACTERS)
  const [originalTitle, setOriginalTitle] = useState('')
  const [originalText, setOriginalText] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/get-home-data`,
          {
            credentials: 'include',
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          }
        )
        let data = null
        try {
          data = await res.json()
        } catch {}

        if (!res.ok) {
          const msg = data?.error || `Error ${res.status}`
          throw new Error(msg)
        }

        const form = data?.form ?? data?.data?.form ?? null
        const home = form && typeof form === 'object' ? form.home ?? null : null

        const sectionText =
          typeof home?.sectionText === 'string' ? home.sectionText : ''
        const titleHome = home?.titleHome ?? ''
        const imageHome = home?.imageHome ?? null

        setHomeData(home ?? {})
        setOriginalTitle(titleHome)
        setOriginalText(sectionText)
        setCharactersRemaining(MAX_CHARACTERS - sectionText.length)
        setFile(imageHome)
      } catch (err) {
        // Silencia aborts de desarrollo / navegación
        if (err?.name === 'AbortError') return
        console.error('Error al obtener los datos:', err)
        toast.error('Error al cargar los datos.')
      }
    })()
    return () => controller.abort()
  }, [setHomeData])

  // Manejar cambio de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      validateAndUpdateField('imageHome', selectedFile)
    }
  }

  const handleImageClick = () => fileInputRef.current?.click()

  // Texto sección
  const handleTextChange = (e) => {
    const newText = e.target.value
    if (newText.length <= MAX_CHARACTERS) {
      setHomeData((prev) => ({ ...prev, sectionText: newText }))
      setCharactersRemaining(MAX_CHARACTERS - newText.length)
    }
  }

  // Título hero
  const handleTitleChange = (e) => {
    setHomeData((prev) => ({ ...prev, titleHome: e.target.value }))
  }

  // Cancelaciones
  const handleCancelText = () => {
    setHomeData((prev) => ({ ...prev, sectionText: originalText }))
    setCharactersRemaining(MAX_CHARACTERS - originalText.length)
  }
  const handleCancelTitle = () => {
    setHomeData((prev) => ({ ...prev, titleHome: originalTitle }))
  }

  // PATCH backend
  const validateAndUpdateField = async (fieldName, value) => {
    if (fieldName !== 'imageHome' && !value) {
      toast.error(`El campo ${fieldName} no puede estar vacío`)
      return
    }

    try {
      if (fieldName === 'imageHome') {
        if (!(value instanceof File)) {
          toast.error('Selecciona una imagen válida')
          return
        }
        const formData = new FormData()
        formData.append('imageHome', value)

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/update-home-data`,
          {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
          }
        )
        const data = await res.json().catch(() => ({}))
        if (!res.ok)
          throw new Error(data?.error || 'Error al actualizar la imagen.')
        toast.success(data?.message || 'Imagen actualizada')
      } else if (fieldName === 'sectionText' || fieldName === 'titleHome') {
        const updateData = { home: { [fieldName]: value } }
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/update-home-data`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(updateData),
            credentials: 'include',
          }
        )
        const data = await res.json().catch(() => ({}))
        if (!res.ok)
          throw new Error(data?.error || 'Error al actualizar los datos.')
        toast.success(data?.message || 'Datos actualizados')
      }
    } catch (error) {
      console.error('Error al actualizar el campo:', error)
      toast.error(error.message || 'Error al actualizar el campo.')
    }
  }

  const handleSectionChange = (section) => setVisibleSection(section)

  return {
    handleSectionChange,
    handleCancelTitle,
    handleCancelText,
    handleTitleChange,
    handleTextChange,
    handleImageClick,
    handleFileChange,
    visibleSection,
    charactersRemaining,
    setCharactersRemaining,
    fileInputRef,
    file,
    MAX_CHARACTERS,
    validateAndUpdateField,
  }
}

export default useAdminHome
