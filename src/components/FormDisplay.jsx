import useFormDisplay from '../hooks/useFormDisplay.js'
import CaptchaComponent from './Captcha.jsx'
import './FormDisplay.css'
import { useTranslation } from 'react-i18next'

const FormDisplay = ({ jsonNumber, title, eventId }) => {
  //Para textos dinámicos en el idioma seleccionado:
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const { sendDataHandler, formRef, formToShow, isSubmitted, isSubmitting } = useFormDisplay(
    jsonNumber,
    eventId
  )

  if (!formToShow?.fields) {
    return <div>No hay datos para mostrar.</div>
  }

  // Mostrar mensaje de confirmación si el formulario fue enviado exitosamente
  if (isSubmitted) {
    return (
      <div className='contenedor-formulario-display'>
        <div className='confirmation-message'>
          <h2 className='titulo-formulario-inscripcion' style={{ color: '#4caf50' }}>
            {currentLang === 'es' ? '¡Inscripción confirmada!' : '¡Inscrición confirmada!'}
          </h2>
          <p className='texto-despues-titulo-formulario' style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
            {currentLang === 'es' 
              ? `Te has inscrito correctamente a: ` 
              : `Inscribiches correctamente a: `}
            <strong>{title}</strong>
          </p>
          <p className='texto-despues-titulo-formulario'>
            {currentLang === 'es'
              ? 'Recibirás un correo de confirmación en breve.'
              : 'Recibirás un correo de confirmación en breve.'}
          </p>
          <button
            className='boton-enviar-formulario-inscripcion'
            onClick={() => window.location.href = '/actividades'}
            style={{ marginTop: '2rem' }}
          >
            {currentLang === 'es' ? 'Ver más actividades' : 'Ver máis actividades'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='contenedor-formulario-display'>
      <p className='texto-anterior-titulo-formulario'>
        {currentLang === 'es' 
          ? 'Te estás inscribiendo a la siguiente actividad:' 
          : 'Estás a inscribirte á seguinte actividade:'}
      </p>
      <h2 className='titulo-formulario-inscripcion'>{title}</h2>
      <p className='texto-despues-titulo-formulario'>
        {currentLang === 'es'
          ? 'Rellena el formulario para formalizar la inscripción:'
          : 'Enche o formulario para formalizar a inscrición:'}
      </p>
      <form ref={formRef}>
        {formToShow.fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <label className='formulario-inscripcion-label'>
              {field.type === 'select' ? (
                <select
                  name={field.label.es.toLowerCase().replace(/\s+/g, '_')}
                  required
                  className='formulario-inscripcion-select'
                  disabled={isSubmitting}
                >
                  <option value=''>
                    {currentLang === 'es' ? '¿Eres socio/a?' : 'É socio/a?'}
                  </option>
                  <option value='sí'>Sí</option>
                  <option value='no'>
                    {currentLang === 'es' ? 'No' : 'Non'}
                  </option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={(currentLang === 'es'
                    ? field.label?.es ?? ''
                    : field.label?.gl || field.label?.es || ''
                  )
                    .toLowerCase()
                    .replace(/\s+/g, '_')}
                  placeholder={
                    currentLang === 'es'
                      ? field.label?.es ?? ''
                      : field.label?.gl || field.label?.es || ''
                  }
                  required
                  className='formulario-inscripcion-input'
                  disabled={isSubmitting}
                />
              )}
            </label>
          </div>
        ))}
        
        {/* LOPD Consent Checkbox */}
        <div style={{ marginBottom: '20px', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input
              type='checkbox'
              name='lopd_consent'
              required
              style={{ marginTop: '0.25rem', width: 'auto', cursor: 'pointer' }}
              disabled={isSubmitting}
            />
            <span>
              {currentLang === 'es' 
                ? 'He leído y acepto la ' 
                : 'Lin e acepto a '}
              <a 
                href='/politica-privacidad' 
                target='_blank' 
                rel='noopener noreferrer'
                style={{ color: '#b380b5', textDecoration: 'underline' }}
              >
                {currentLang === 'es' ? 'política de privacidad' : 'política de privacidade'}
              </a>
              {currentLang === 'es'
                ? ' y el tratamiento de mis datos personales.'
                : ' e o tratamento dos meus datos persoais.'}
            </span>
          </label>
        </div>

        <CaptchaComponent
          handleSubmit={sendDataHandler}
          captchaInputClassName={'captcha-input-formulario'}
          buttonClassName={'boton-enviar-formulario-inscripcion'}
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default FormDisplay
