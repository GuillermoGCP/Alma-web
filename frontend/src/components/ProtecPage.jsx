import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProtectPage({ children }) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const checkSessionURL = import.meta.env.VITE_API_URL + '/check-session'
    const googleURL = import.meta.env.VITE_GOOGLE_URL
    const backURL = import.meta.env.VITE_API_URL
    const clientId = import.meta.env.VITE_CLIENT_ID

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(checkSessionURL, {
                    credentials: 'include',
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log(data.message)
                    setLoading(false)
                } else {
                    window.location.href = `${googleURL}?client_id=${clientId}&redirect_uri=${backURL}/auth/callback&response_type=code&scope=email%20profile`
                }
            } catch (error) {
                console.error('Error checking session:', error)
            }
        }

        checkSession()
    }, [navigate, checkSessionURL])

    if (loading) {
        return <FontAwesomeIcon />
    }

    return children
}

export default ProtectPage
