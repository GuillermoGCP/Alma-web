import { useState } from 'react'
import Footer from '../components/Footer'
import useLibraryData from '../hooks/useLibraryData'
import './Library.css'
import { useTranslation } from 'react-i18next'

const Library = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  const [openInfo, setOpenInfo] = useState(null)
  const libraryData = useLibraryData()

  // Safeties: defaults cuando libraryData es null o viene con formas distintas
  const lib = libraryData ?? {}

  const lactationResources = Array.isArray(lib.lactationResources)
    ? lib.lactationResources
    : []
  const lactationBooks =
    typeof lib.lactationBooks === 'string' ? lib.lactationBooks : ''

  const pregnancyResources = Array.isArray(lib.pregnancyResources)
    ? lib.pregnancyResources
    : []
  const pregnancyBooks =
    typeof lib.pregnancyBooks === 'string' ? lib.pregnancyBooks : ''

  const parentingResources = Array.isArray(lib.parentingResources)
    ? lib.parentingResources
    : []
  const parentingBooks =
    typeof lib.parentingBooks === 'string' ? lib.parentingBooks : ''

  const nutritionBlogs = Array.isArray(lib.nutritionBlogs)
    ? lib.nutritionBlogs
    : []
  const nutritionBooks =
    typeof lib.nutritionBooks === 'string' ? lib.nutritionBooks : ''

  const archiveBlogs = Array.isArray(lib.archiveBlogs) ? lib.archiveBlogs : []

  const renderTextWithFormatting = (text) => {
    if (typeof text !== 'string' || !text.trim()) return null
    return text.split('\n').map((item, index) => {
      const line = item.trim()
      if (!line) return null
      return line.endsWith(':') ? (
        <h4 key={index}>{line}</h4>
      ) : (
        <li key={index}>{line}</li>
      )
    })
  }

  const toggleInfo = (info) => setOpenInfo(info === openInfo ? null : info)

  return (
    <div className='library-page'>
      <main className='library-main'>
        <p className='alma-text'>Alma Lactancia</p>

        <h1 className='library-title'>Biblioteca</h1>
        <div className='contenedor-texto-biblioteca'>
          <p className='library-text'>{t('textoInicialBiblioteca')}</p>
          <p className='library-text'>{t('textoInicialDosBiblioteca')}</p>
        </div>

        <div className='collapsible-main'>
          <div className='collapsible-container-library'>
            {/* Lactancia */}
            <div
              className={`collapsible-header-library ${
                openInfo === 'lactancia' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('lactancia')}
            >
              <span className='collapsible-title-library'>Lactancia</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === 'lactancia' ? 'open' : ''
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'lactancia' && (
              <div className='collapsible-content-library'>
                <h3>RECURSOS ONLINE</h3>
                <ul>
                  {lactationResources.map((resource, index) => (
                    <li key={resource?.id ?? index}>
                      <a
                        href={resource?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {currentLang === 'es'
                          ? resource?.title?.es
                          : resource?.title?.gl}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(lactationBooks)}</ul>
              </div>
            )}
          </div>

          {/* Embarazo */}
          <div className='collapsible-container-library'>
            <div
              className={`collapsible-header-library ${
                openInfo === 'embarazo' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('embarazo')}
            >
              <span className='collapsible-title-library'>Embarazo</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === 'embarazo' ? 'open' : ''
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'embarazo' && (
              <div className='collapsible-content-library'>
                <h3>RECURSOS</h3>
                <ul>
                  {pregnancyResources.map((resource, index) => (
                    <li key={resource?.id ?? index}>
                      <a
                        href={resource?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {currentLang === 'es'
                          ? resource?.title?.es
                          : resource?.title?.gl}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(pregnancyBooks)}</ul>
              </div>
            )}
          </div>

          {/* Crianza */}
          <div className='collapsible-container-library'>
            <div
              className={`collapsible-header-library ${
                openInfo === 'crianza' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('crianza')}
            >
              <span className='collapsible-title-library'>Crianza</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === 'crianza' ? 'open' : ''
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'crianza' && (
              <div className='collapsible-content-library'>
                <h3>OTROS RECURSOS</h3>
                <ul>
                  {parentingResources.map((resource, index) => (
                    <li key={resource?.id ?? index}>
                      <a
                        href={resource?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {currentLang === 'es'
                          ? resource?.title?.es
                          : resource?.title?.gl}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(parentingBooks)}</ul>
              </div>
            )}
          </div>

          {/* Alimentación complementaria */}
          <div className='collapsible-container-library'>
            <div
              className={`collapsible-header-library ${
                openInfo === 'alimentacion' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('alimentacion')}
            >
              <span className='collapsible-title-library'>
                Alimentación complementaria
              </span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === 'alimentacion' ? 'open' : ''
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'alimentacion' && (
              <div className='collapsible-content-library'>
                <h3>BLOGS</h3>
                <ul>
                  {nutritionBlogs.map((resource, index) => (
                    <li key={resource?.id ?? index}>
                      <a
                        href={resource?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {currentLang === 'es'
                          ? resource?.title?.es
                          : resource?.title?.gl}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(nutritionBooks)}</ul>
              </div>
            )}
          </div>

          {/* Hemeroteca */}
          <div className='collapsible-container-library'>
            <div
              className={`collapsible-header-library ${
                openInfo === 'hemeroteca' ? 'open' : ''
              }`}
              onClick={() => toggleInfo('hemeroteca')}
            >
              <span className='collapsible-title-library'>Hemeroteca</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === 'hemeroteca' ? 'open' : ''
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === 'hemeroteca' && (
              <div className='collapsible-content-library'>
                {archiveBlogs.map((resource, index) => (
                  <p key={resource?.id ?? index}>
                    <a
                      href={resource?.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {currentLang === 'es'
                        ? resource?.title?.es
                        : resource?.title?.gl}
                    </a>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Library
