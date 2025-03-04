import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import fedalma from '../images/cropped-logo_fedalma_200.png'
import fedegalma from '../images/logo-fedegalma1-300x102.jpg'
import './About.css'
import { useTranslation } from 'react-i18next'

const defaultCollaboratorPicture =
  'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'

const About = () => {
  const { t, i18n } = useTranslation()

  //Esto es para el condicional de los datos dinámicos traducidos llegados desde el backend:
  const currentLang = i18n.language

  const [openInfo, setOpenInfo] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [externalCollaborators, setExternalCollaborators] = useState([])
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const [teamResponse, externalResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/get-all-collaborators/false`),
          fetch(`${import.meta.env.VITE_API_URL}/get-all-collaborators/true`),
        ])

        if (!teamResponse.ok || !externalResponse.ok) {
          const errorResponse = await teamResponse.text() // Obtener texto de la respuesta
          throw new Error(
            `Error al obtener los colaboradores: ${errorResponse}`
          )
        }

        const teamData = await teamResponse.json()
        const externalData = await externalResponse.json()
        setTeamMembers(teamData.data)
        setExternalCollaborators(externalData.data)

        console.log(teamMembers)
        console.log(externalCollaborators)
      } catch (error) {
        console.error('Error al obtener los colaboradores:', error)
      }
    }

    fetchCollaborators()
  }, [])

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info)
  }

  return (
    <div className='about-page'>
      <main className='about-main'>
        <div className='img-section-about'>
          <div className='background-image2'></div>
          <h2 className='about-alma'>Alma Lactancia</h2>
          <h1 className='about-title'>
            {' '}
            {/*TEXTO EQUIPO TRADUCIDO*/}
            {t('equipo')}
          </h1>
        </div>

        {/* Sección del equipo */}
        <div className='about-people'>
          {teamMembers.slice(0, 7).map((member) => (
            <div key={member.id} className='person-card'>
              <div className='person-card-inner'>
                <div className='person-card-front'>
                  {/* //! Estilos in-line */}
                  <div style={{ maxHeight: '60%' }}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                      src={
                        member.image && member.image !== 'Sin imagen'
                          ? member.image
                          : defaultCollaboratorPicture
                      }
                      alt={member.name}
                      // src={test_Rosa}
                      className='person-image'
                    />
                  </div>

                  <div className='person-info'>
                    <h3>{member.name}</h3>
                    <p>
                      {currentLang === 'es' ? member.role.es : member.role.gl}
                    </p>
                  </div>
                </div>
                <div className='person-card-back'>
                  <p>
                    {currentLang === 'es'
                      ? member.description.es
                      : member.description.gl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de colaboraciones externas */}
        <h1 className='section-title1'> {t('colabsExternas')}</h1>
        <div className='about-collab'>
          <div className='collab-container'>
            {externalCollaborators.slice(0, 5).map((collaborator) => (
              <div key={collaborator.id} className='collab-card'>
                <img
                  src={
                    collaborator.image && collaborator.image !== 'Sin imagen'
                      ? collaborator.image
                      : defaultCollaboratorPicture
                  }
                  alt={collaborator.name}
                  className='collab-image'
                />
                <h3>{collaborator.name}</h3>
                <p>
                  {currentLang === 'es'
                    ? collaborator.role.es
                    : collaborator.role.gl}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de apoyo */}
        <div className='about-support'>
          <h1 className='section-title2'>{t('nuestroCompromiso')}</h1>

          {/* Sección Qué Hacemos */}
          <div className='collapsible-container-about'>
            <div
              className={`collapsible-header-about ${
                openInfo === 'quehacemos' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('quehacemos')}
            >
              <span className='collapsible-title-about'>{t('queHacemos')}</span>
              <span
                className={`collapsible-arrow-about ${
                  openInfo === 'quehacemos' ? 'open' : 'closed'
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'quehacemos' && (
              <div className='collapsible-content-about'>
                {typeof t('queHacemosTexto') === 'string' ? (
                  <p>
                    {t('queHacemosTexto')
                      .split('\n') // Divide el texto por saltos de línea
                      .map((p, index) => (
                        <p key={index}>{p}</p> // Crea un párrafo por cada línea
                      ))}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {/* Sección Qué No Hacemos */}
          <div className='collapsible-container-about'>
            <div
              className={`collapsible-header-about ${
                openInfo === 'quenohacemos' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('quenohacemos')}
            >
              <span className='collapsible-title-about'>
                {t('queNoHacemosTitulo')}
              </span>
              <span
                className={`collapsible-arrow-about ${
                  openInfo === 'quenohacemos' ? 'open' : 'closed'
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'quenohacemos' && (
              <div className='collapsible-content-about'>
                {t('queNoHacemos')
                  .split('\n') // Divide el texto en un arreglo usando el salto de línea
                  .map((item, index) => (
                    <p key={index}>{item}</p> // Crea un párrafo por cada línea
                  ))}
              </div>
            )}
          </div>

          {/* Sección Quién Nos Apoya */}
          <div className='collapsible-container-about'>
            <div
              className={`collapsible-header-about ${
                openInfo === 'quienapoya' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('quienapoya')}
            >
              <span className='collapsible-title-about'>
                {t('quienNosApoya')}
              </span>
              <span
                className={`collapsible-arrow-about ${
                  openInfo === 'quienapoya' ? 'open' : 'closed'
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'quienapoya' && (
              <div className='collapsible-content-about'>
                {t('apoyoTexto')
                  .split('\n') // Divide el texto en un arreglo usando el salto de línea
                  .map((item, index) => (
                    <p key={index}>{item}</p> // Crea un párrafo por cada línea
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Entidades colaboradoras */}
        <h1 className='section-title3'>Entidades colaboradoras</h1>
        <div className='about-img'>
          <img src={fedalma} className='fedalma-img' />
          <img src={fedegalma} className='fedegalma-img' />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default About
