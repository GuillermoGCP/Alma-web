// src/hooks/useLibraryData.js
import { useState, useEffect } from 'react'
import axios from 'axios'

const useLibraryData = () => {
  const [libraryData, setLibraryData] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    axios
      .get(`${API_BASE_URL}/get-home-data`, {
        withCredentials: true,
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      })
      .then((response) => {
        if (ignore) return
        const form = response?.data?.form ?? response?.data?.data?.form ?? null
        const library =
          form && typeof form === 'object' ? form.library ?? null : null
        setLibraryData(library)
      })
      .catch((error) => {
        if (axios.isCancel?.(error) || error?.code === 'ERR_CANCELED') return
        console.error('Error al obtener datos:', error)
        if (!ignore) setLibraryData(null)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [API_BASE_URL])

  return libraryData
}

export default useLibraryData
