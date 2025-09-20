import { useState, useEffect, useMemo } from 'react'
import Footer from '../components/Footer'
import Calendar from '../components/Calendar'
import silueta from '../images/IlustracionLactancia.png'
import useContactInfo from '../hooks/useContactInfo.js'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Home.css'
import { useTranslation } from 'react-i18next'

const API = import.meta.env.VITE_API_URL
const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'

const Home = ({ homeData, scrolled }) => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const { home } = useContactInfo()

  const navigate = useNavigate()
  const [cardsToShow, setCardsToShow] = useState(
    window.innerWidth < 768 ? 1 : 2
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Derivados seguros
  const imageHomeSrc =
    home?.imageHome ||
    'src/images/Alma_Lactancia_-_Foto_hero.jpg' ||
    DEFAULT_IMAGE_URL
  const textsNosotras = useMemo(() => {
    const s = home?.sectionText
    if (!s) return []
    return (currentLang === 'es' ? s.es : s.gl)?.split('\n') ?? []
  }, [home, currentLang])
  const titleCTA =
    currentLang === 'es' ? home?.titleHome?.es || '' : home?.titleHome?.gl || ''

  // Responsive: nº de tarjetas
  useEffect(() => {
    const onResize = () => setCardsToShow(window.innerWidth < 768 ? 1 : 2)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Cargar experiencias (tolerante a 500)
  useEffect(() => {
    const ac = new AbortController()

    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API}/get-filtered-experiences`, {
          credentials: 'include',
          signal: ac.signal,
          headers: { Accept: 'application/json' },
        })

        if (!res.ok) {
          let detail = ''
          try {
            detail = await res.text()
          } catch {}
          console.error(`GET /get-filtered-experiences → ${res.status}`, detail)
          setExperiences([])
          setError(
            t('errorCargandoExperiencias') ||
              'No se pudieron cargar las experiencias.'
          )
          return
        }

        const body = await res.json()
        const list = Array.isArray(body?.data)
          ? body.data
          : Array.isArray(body)
          ? body
          : []
        setExperiences(list)
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error(e)
          setExperiences([])
          setError(
            t('errorCargandoExperiencias') ||
              'No se pudieron cargar las experiencias.'
          )
        }
      } finally {
        setLoading(false)
      }
    })()

    return () => ac.abort()
  }, [homeData])

  const total = experiences.length

  const nextSlide = () => {
    setCurrentIndex((idx) =>
      idx < Math.max(total - cardsToShow, 0) ? idx + cardsToShow : 0
    )
  }

  const prevSlide = () => {
    setCurrentIndex((idx) =>
      idx > 0 ? idx - cardsToShow : Math.max(total - cardsToShow, 0)
    )
  }

  const handleActivitiesClick = () => navigate('/actividades')

  if (loading) {
    return (
      <div className='loading-container'>
        <FontAwesomeIcon icon={faSpinner} className='spinner' spin size='2x' />
      </div>
    )
  }

  return (
    <div className='home-page'>
      <main className='main-home'>
        <div className='img-section'>
          <div className='background-image'>
            <img
              className='imageHome-img'
              src={imageHomeSrc}
              alt='imagen bebe'
              onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
            />
          </div>
          <div className='support-button'>
            <p className='texto-cta'>{titleCTA}</p>
            <button
              className='activities-button'
              onClick={handleActivitiesClick}
            >
              {t('nuestrasActividades')}
            </button>
          </div>
        </div>

        <div className='content'>
          <h2 className='section-title'>{t('nosotras')}</h2>
          <div className='centered-container'>
            {textsNosotras.map((p, i) => (
              <p key={i} className='sectionText-nosotras'>
                {p}
              </p>
            ))}
          </div>
          <img src={silueta} className='img-silueta' alt='silueta lactancia' />
          <Calendar />
        </div>

        <div className='experience-section'>
          <h2 className='experience-title'>{t('experienciasReales')}</h2>

          {error ? (
            <p className='experience-error'>{error}</p>
          ) : (
            <div className='experience-carousel'>
              <div className='carousel-controls'>
                <button
                  className='carousel-control prev'
                  onClick={prevSlide}
                  aria-label='Anterior'
                >
                  <i className='fas fa-chevron-left'></i>
                </button>
              </div>

              <div className='experience-cards'>
                {experiences
                  .slice(currentIndex, currentIndex + cardsToShow)
                  .map((exp, i) => (
                    <div
                      key={exp.id || exp._id || `${currentIndex}-${i}`}
                      className='experience-card'
                    >
                      <img
                        src={
                          exp.image && exp.image !== 'Sin imagen'
                            ? exp.image
                            : DEFAULT_IMAGE_URL
                        }
                        alt='experiencia'
                        onError={(e) =>
                          (e.currentTarget.src = DEFAULT_IMAGE_URL)
                        }
                      />
                      <p>
                        {currentLang === 'es' ? exp?.text?.es : exp?.text?.gl}
                      </p>
                    </div>
                  ))}
              </div>

              <button
                className='carousel-control next'
                onClick={nextSlide}
                aria-label='Siguiente'
              >
                <i className='fas fa-chevron-right'></i>
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
