import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

const useAdminHome = (setHomeData) => {
    const MAX_CHARACTERS = 1800
    const [visibleSection, setVisibleSection] = useState(null)
    // const [homeData, setHomeData] = useState({
    //     sectionText: '',
    //     imageHome: '',
    //     titleHome: '',
    //     experiences: [],
    //     selectedExperiences: [],
    // })
    const [file, setFile] = useState(null)
    const [charactersRemaining, setCharactersRemaining] =
        useState(MAX_CHARACTERS)
    const [originalTitle, setOriginalTitle] = useState('') // Estado para almacenar el valor original de titleHome
    const [originalText, setOriginalText] = useState('') // Estado para almacenar el valor original de sectionText
    const fileInputRef = useRef(null) // Referencia para el input de archivo

    // Cargar datos desde el backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/get-home-data`
                )
                const data = await response.json()

                // toast.success(data.message)

                const { home } = data.form
                setHomeData(home)
                setOriginalTitle(home.titleHome)
                setOriginalText(home.sectionText)
                setCharactersRemaining(MAX_CHARACTERS - home.sectionText.length)
                setFile(home.imageHome)
            } catch (error) {
                console.error('Error al obtener los datos:', error)
                toast.error('Error al cargar los datos.')
            }
        }

        fetchData()
    }, [])

    // Manejar el cambio de imagen
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            validateAndUpdateField('imageHome', selectedFile)
        }
    }

    // Simular clic en el input de archivo
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    // Manejar el cambio de texto en textarea
    const handleTextChange = (e) => {
        const newText = e.target.value
        if (newText.length <= MAX_CHARACTERS) {
            setHomeData((prevData) => ({
                ...prevData,
                sectionText: newText,
            }))
            setCharactersRemaining(MAX_CHARACTERS - newText.length)
        }
    }

    // Manejar el cambio del título del Hero
    const handleTitleChange = (e) => {
        setHomeData((prevData) => ({
            ...prevData,
            titleHome: e.target.value,
        }))
    }

    // Cancelar cambios en el textarea
    const handleCancelText = () => {
        setHomeData((prevData) => ({
            ...prevData,
            sectionText: originalText,
        }))
        setCharactersRemaining(MAX_CHARACTERS - originalText.length)
    }

    // Cancelar cambios en el título
    const handleCancelTitle = () => {
        setHomeData((prevData) => ({
            ...prevData,
            titleHome: originalTitle,
        }))
    }

    // Validar y actualizar imagen o texto en el backend
    const validateAndUpdateField = async (fieldName, value) => {
        if (fieldName !== 'imageHome' && !value) {
            toast.error(`El campo ${fieldName} no puede estar vacío`)
            return
        }

        try {
            if (fieldName === 'imageHome' && file) {
                const formData = new FormData()
                formData.append('imageHome', value)

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/update-home-data`,
                    {
                        method: 'PATCH',
                        body: formData,
                    }
                )

                const data = await response.json()

                if (response.ok) {
                    toast.success(data.message)
                } else {
                    throw new Error(
                        data.error || 'Error al actualizar la imagen.'
                    )
                }
            } else if (
                fieldName === 'sectionText' ||
                fieldName === 'titleHome'
            ) {
                // Actualizar el texto de la sección "Nosotras" o el título del Hero
                const updateData = {
                    home: {
                        [fieldName]: value,
                    },
                }

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/update-home-data`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateData),
                    }
                )

                const data = await response.json()

                if (response.ok) {
                    toast.success(data.message)
                } else {
                    throw new Error(
                        data.error || 'Error al actualizar los datos.'
                    )
                }
            }
        } catch (error) {
            console.error('Error al actualizar el campo:', error)
            toast.error(error.message || 'Error al actualizar el campo.')
        }
    }

    const handleSectionChange = (section) => {
        setVisibleSection(section)
    }

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
