import React from 'react'
import clearSessionData from '../utils/clearSessionData'

const Login = () => {
    const backURL = import.meta.env.VITE_API_URL
    const clientId = import.meta.env.VITE_CLIENT_ID
    const googleURL = import.meta.env.VITE_GOOGLE_URL

    const handleLogin = () => {
        clearSessionData()
        window.location.href = `${googleURL}?client_id=${clientId}&redirect_uri=${backURL}/auth/callback&response_type=code&scope=email%20profile`
    }

    return (
        <div>
            <h1>Inicia sesión con Google</h1>
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    )
}

export default Login
