import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './AdminGeneral.css'

const API_BASE_URL = import.meta.env.VITE_API_URL

const initialSettings = {
  logo: '',
  linkInstagram: '',
  linkFacebook: '',
  email: '',
}

const AdminGeneral = () => {
  const [settings, setSettings] = useState(initialSettings)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const objectUrlRef = useRef(null)

  const notify = (type, message) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  // ======================
  // Fetch de datos actuales
  // ======================
  useEffect(() => {
    const ac = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get-home-data`, {
          credentials: 'include',
          signal: ac.signal,
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          throw new Error(`GET /get-home-data → ${res.status}`)
        }
        const json = await res.json()

        // Soporta ambos formatos: {form} o {data:{form}}
        const form = json?.form ?? json?.data?.form ?? {}
        const generalSettings = form?.generalSettings ?? {}

        setSettings((prev) => ({ ...prev, ...generalSettings }))
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching data:', err)
          notify('error', 'No se pudo cargar la configuración')
        }
      }
    })()

    return () => ac.abort()
  }, [])

  // ======================
  // Handlers
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    // preview: limpia el anterior
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    if (f) objectUrlRef.current = URL.createObjectURL(f)
  }

  const validateAndUpdateField = async (fieldName, value) => {
    if (loading) return

    // Validación básica
    if (fieldName !== 'logo' && !value) {
      notify('error', `El campo ${fieldName} no puede estar vacío`)
      return
    }

    try {
      setLoading(true)

      if (fieldName === 'logo') {
        if (!file) {
          notify('error', 'Selecciona un archivo primero')
          return
        }

        const formData = new FormData()
        formData.append('logo', file)

        const res = await fetch(`${API_BASE_URL}/update-home-data`, {
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        })
        if (!res.ok) throw new Error(`PATCH logo → ${res.status}`)

        const json = await res.json()
        const updated = json?.data ?? json // por si el back devuelve {data:{...}}
        const generalSettings =
          updated?.generalSettings ?? updated?.form?.generalSettings ?? {}

        setSettings((prev) => ({ ...prev, ...generalSettings }))
        notify('success', 'Logotipo actualizado correctamente')
      } else {
        const payload = { generalSettings: { [fieldName]: value } }

        const res = await fetch(`${API_BASE_URL}/update-home-data`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`PATCH ${fieldName} → ${res.status}`)

        // opcional: rehidrata desde respuesta si la envías
        // const json = await res.json()

        notify('success', `${fieldName} actualizado correctamente`)
      }
    } catch (err) {
      console.error(err)
      notify('error', `Error al actualizar ${fieldName}: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='settings-content-general'>
      <div className='logo-section'>
        <h3>Logotipo</h3>

        <img
          src={
            objectUrlRef.current ? objectUrlRef.current : settings.logo || ''
          }
          alt='Logo'
          className='logo-image'
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        <div className='logo-buttons'>
          <input type='file' accept='image/*' onChange={handleFileChange} />
        </div>

        <div className='actualizar-logo-boton'>
          <button
            disabled={loading || !file}
            onClick={() => validateAndUpdateField('logo', file)}
          >
            <FontAwesomeIcon icon={faUpload} />{' '}
            {loading ? 'Subiendo…' : 'Actualizar Logotipo'}
          </button>
        </div>
      </div>

      <form className='social-links-form' onSubmit={(e) => e.preventDefault()}>
        <label>
          Link de Instagram
          <input
            type='text'
            name='linkInstagram'
            placeholder='Nueva dirección de Instagram'
            value={settings.linkInstagram || ''}
            onChange={handleChange}
          />
          <button
            type='button'
            disabled={loading}
            onClick={() =>
              validateAndUpdateField('linkInstagram', settings.linkInstagram)
            }
          >
            <i className='fab fa-instagram'></i> Actualizar Instagram
          </button>
        </label>

        <label>
          Link de Facebook
          <input
            type='text'
            name='linkFacebook'
            placeholder='Nueva dirección de Facebook'
            value={settings.linkFacebook || ''}
            onChange={handleChange}
          />
          <button
            type='button'
            disabled={loading}
            onClick={() =>
              validateAndUpdateField('linkFacebook', settings.linkFacebook)
            }
          >
            <i className='fab fa-facebook'></i> Actualizar Facebook
          </button>
        </label>

        <label>
          Correo Electrónico
          <input
            type='email'
            name='email'
            placeholder='Nueva dirección de correo electrónico'
            value={settings.email || ''}
            onChange={handleChange}
          />
          <button
            type='button'
            disabled={loading}
            onClick={() => validateAndUpdateField('email', settings.email)}
          >
            <i className='fas fa-envelope'></i> Actualizar Correo
          </button>
        </label>
      </form>
    </main>
  )
}

export default AdminGeneral
