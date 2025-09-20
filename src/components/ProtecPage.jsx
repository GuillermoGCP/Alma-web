import { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './ProtecPage.css'

function ProtectPage({ children }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const checkSessionURL = import.meta.env.VITE_API_URL + '/check-session'
  const googleURL = import.meta.env.VITE_GOOGLE_URL
  const backURL = import.meta.env.VITE_API_URL
  const clientId = import.meta.env.VITE_CLIENT_ID

  const checkSession = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(checkSessionURL, {
        credentials: 'include',
      })

      if (response.ok) {
        setLoading(false)
      } else {
        window.location.href = `${googleURL}?client_id=${clientId}&redirect_uri=${backURL}/auth/callback&response_type=code&scope=email%20profile`
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setError('No se pudo verificar la sesion. Intentalo de nuevo.')
      setLoading(false)
    }
  }, [checkSessionURL, googleURL, clientId, backURL])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (loading) {
    return (
      <div className='protect-page-loading'>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    )
  }

  if (error) {
    return (
      <div className='protect-page-error'>
        <p>{error}</p>
        <button type='button' onClick={checkSession}>
          Reintentar
        </button>
      </div>
    )
  }

  return children
}

export default ProtectPage
