import { useState, useEffect } from 'react'
import axios from 'axios'

const useLibraryData = () => {
    const [libraryData, setLibraryData] = useState(null)
    const API_BASE_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/get-home-data`)
            .then((response) => {
                const { library } = response.data.form
                setLibraryData(library)
            })
            .catch((error) => console.error('Error al obtener datos:', error))
    }, [API_BASE_URL])

    return libraryData
}

export default useLibraryData
