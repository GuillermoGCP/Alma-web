import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

const DEFAULT = {
  generalSettings: { logo: '', linkInstagram: '', linkFacebook: '', email: '' },
  home: {},
}

export default function useContactInfo() {
  const [data, setData] = useState(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/get-home-data`, {
          withCredentials: true, // <-- cookie
          headers: { Accept: 'application/json' },
        })

        // Soporta {form} o {data:{form}} y casos con null
        const form = res.data?.form ?? res.data?.data?.form ?? {}
        const generalSettings = form?.generalSettings ?? {}
        const home = form?.home ?? {}

        if (!cancelled)
          setData({
            generalSettings: { ...DEFAULT.generalSettings, ...generalSettings },
            home: { ...DEFAULT.home, ...home },
          })
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setData(DEFAULT) // no rompas la UI
          console.error('Error al obtener datos:', err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { ...data, loading, error }
}
