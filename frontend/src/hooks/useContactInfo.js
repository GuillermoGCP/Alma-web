import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
    generalSettings: null,
    home: null,
  })
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/get-home-data`)
      .then((response) => {
        const { generalSettings, home } = response.data.form
        setContactInfo({ generalSettings, home })
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error)
      })
  }, [API_BASE_URL])

  return contactInfo
}

export default useContactInfo
