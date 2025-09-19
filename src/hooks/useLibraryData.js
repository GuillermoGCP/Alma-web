import { useState, useEffect } from 'react'
import axios from 'axios'

const useLibraryData = () => {
  const [libraryData, setLibraryData] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get(`${API_BASE_URL}/get-home-data`, {
        withCredentials: true,
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      })
      .then((response) => {
        const form = response?.data?.form ?? response?.data?.data?.form ?? null
        const library =
          form && typeof form === 'object' ? form.library ?? null : null
        setLibraryData(library)
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error)
        setLibraryData(null)
      })

    return () => controller.abort()
  }, [API_BASE_URL])

  return libraryData
}

export default useLibraryData
