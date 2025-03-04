import React, { useState } from 'react'
import useAdminLibrary from '../../hooks/useAdminLibrary.js'
import './AdminLibrary.css'
import Modal from '../../modal/ModalBooks.jsx'
import ModalInstructions from '../../modal/ModalInstructions.jsx'
import { useTranslation } from 'react-i18next'

const AccordionSection = ({
  title,
  children,
  isOpen,
  toggleOpen,
  onSubmit,
}) => (
  <div className='admin-library-accordion-section'>
    <h2 className='admin-library-accordion-title' onClick={toggleOpen}>
      {title} <i className='fas fa-arrow-down'></i>
    </h2>
    {isOpen && (
      <div className='admin-library-accordion-content'>
        {children}
        <button
          className='admin-library-button'
          type='button'
          onClick={onSubmit}
        >
          <i className='fas fa-save'></i> Guardar Cambios
        </button>
      </div>
    )}
  </div>
)

const AdminLibrary = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const {
    libraryData,
    handleChange,
    handleSubmit,
    setLibraryData,
    MAX_CHARACTERS,
  } = useAdminLibrary()
  const [openSection, setOpenSection] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleDeleteResource = (type, index) => {
    setLibraryData((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((_, i) => i !== index),
    }))
  }

  return (
    <form className='admin-library-form'>
      <h1>Libreria</h1>

      {/* // Sección de Lactancia */}
      <AccordionSection
        title='Lactancia'
        isOpen={openSection === 'lactancia'}
        toggleOpen={() => toggleSection('lactancia')}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.lactationResources.map((resource, index) => (
          <div key={index} className='admin-library-resource-inputs'>
            <div className='contenedor-titulo-library'>
              <p>Título:</p>

              <input
                type='text'
                className='admin-library-input'
                placeholder='Título'
                value={resource.title.es}
                onChange={(e) =>
                  handleChange(
                    'lactationResources',
                    libraryData.lactationResources.map((r, i) =>
                      i === index ? { ...r, title: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className='contenedor-enlace-library'>
              <p>Enlace:</p>

              <input
                type='text'
                className='admin-library-input'
                placeholder='Enlace'
                value={resource.link}
                onChange={(e) =>
                  handleChange(
                    'lactationResources',
                    libraryData.lactationResources.map((r, i) =>
                      i === index ? { ...r, link: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div>
              <button
                className='admin-library-button admin-library-button-delete'
                type='button'
                onClick={() =>
                  handleDeleteResource('lactationResources', index)
                }
              >
                <i className='fas fa-trash-alt'></i> Eliminar
              </button>
            </div>
          </div>
        ))}
        <button
          className='admin-library-button'
          type='button'
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              lactationResources: [
                ...prevState.lactationResources,
                { title: '', link: '' },
              ],
            }))
          }
        >
          <i className='fas fa-plus'></i> Agregar Recurso
        </button>
        <div className='contenedor-seccion-libros'>
          <label>Libros:</label>
          <textarea
            className='admin-library-textarea'
            value={libraryData.lactationBooks}
            onChange={(e) => handleChange('lactationBooks', e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Embarazo */}
      <AccordionSection
        title='Embarazo'
        isOpen={openSection === 'embarazo'}
        toggleOpen={() => toggleSection('embarazo')}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.pregnancyResources.map((resource, index) => (
          <div key={index} className='admin-library-resource-inputs'>
            <div className='contenedor-titulo-library'>
              <p>Título:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Título'
                value={resource.title.es}
                onChange={(e) =>
                  handleChange(
                    'pregnancyResources',
                    libraryData.pregnancyResources.map((r, i) =>
                      i === index ? { ...r, title: e.target.value } : r
                    )
                  )
                }
              />{' '}
            </div>
            <div className='contenedor-enlace-library'>
              <p>Enlace:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Enlace'
                value={resource.link}
                onChange={(e) =>
                  handleChange(
                    'pregnancyResources',
                    libraryData.pregnancyResources.map((r, i) =>
                      i === index ? { ...r, link: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className='admin-library-button admin-library-button-delete'
              type='button'
              onClick={() => handleDeleteResource('pregnancyResources', index)}
            >
              <i className='fas fa-trash-alt'></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className='admin-library-button'
          type='button'
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              pregnancyResources: [
                ...prevState.pregnancyResources,
                { title: '', link: '' },
              ],
            }))
          }
        >
          <i className='fas fa-plus'></i> Agregar Recurso
        </button>
        <div className='contenedor-seccion-libros'>
          <label>Libros:</label>
          <textarea
            className='admin-library-textarea'
            value={libraryData.pregnancyBooks}
            onChange={(e) => handleChange('pregnancyBooks', e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Crianza */}
      <AccordionSection
        title='Crianza'
        isOpen={openSection === 'crianza'}
        toggleOpen={() => toggleSection('crianza')}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.parentingResources.map((resource, index) => (
          <div key={index} className='admin-library-resource-inputs'>
            <div className='contenedor-titulo-library'>
              <p>Título:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Título'
                value={resource.title.es}
                onChange={(e) =>
                  handleChange(
                    'parentingResources',
                    libraryData.parentingResources.map((r, i) =>
                      i === index ? { ...r, title: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className='contenedor-enlace-library'>
              <p>Enlace:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Enlace'
                value={resource.link}
                onChange={(e) =>
                  handleChange(
                    'parentingResources',
                    libraryData.parentingResources.map((r, i) =>
                      i === index ? { ...r, link: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className='admin-library-button admin-library-button-delete'
              type='button'
              onClick={() => handleDeleteResource('parentingResources', index)}
            >
              <i className='fas fa-trash-alt'></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className='admin-library-button'
          type='button'
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              parentingResources: [
                ...prevState.parentingResources,
                { title: '', link: '' },
              ],
            }))
          }
        >
          <i className='fas fa-plus'></i> Agregar Recurso
        </button>
        <div className='contenedor-seccion-libros'>
          <label>Libros:</label>
          <textarea
            className='admin-library-textarea'
            value={libraryData.parentingBooks}
            onChange={(e) => handleChange('parentingBooks', e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Alimentación Complementaria */}
      <AccordionSection
        title='Alimentación Complementaria'
        isOpen={openSection === 'alimentacion'}
        toggleOpen={() => toggleSection('alimentacion')}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.nutritionBlogs.map((resource, index) => (
          <div key={index} className='admin-library-resource-inputs'>
            <div className='contenedor-titulo-library'>
              <p>Título:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Título'
                value={resource.title.es}
                onChange={(e) =>
                  handleChange(
                    'nutritionBlogs',
                    libraryData.nutritionBlogs.map((r, i) =>
                      i === index ? { ...r, title: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className='contenedor-enlace-library'>
              <p>Enlace:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Enlace'
                value={resource.link}
                onChange={(e) =>
                  handleChange(
                    'nutritionBlogs',
                    libraryData.nutritionBlogs.map((r, i) =>
                      i === index ? { ...r, link: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className='admin-library-button admin-library-button-delete'
              type='button'
              onClick={() => handleDeleteResource('nutritionBlogs', index)}
            >
              <i className='fas fa-trash-alt'></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className='admin-library-button'
          type='button'
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              nutritionBlogs: [
                ...prevState.nutritionBlogs,
                { title: '', link: '' },
              ],
            }))
          }
        >
          <i className='fas fa-plus'></i> Agregar Recurso
        </button>
        <div className='contenedor-seccion-libros'>
          <label>Libros:</label>
          <textarea
            className='admin-library-textarea'
            value={libraryData.nutritionBooks}
            onChange={(e) => handleChange('nutritionBooks', e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Hemeroteca */}
      <AccordionSection
        title='Hemeroteca'
        isOpen={openSection === 'hemeroteca'}
        toggleOpen={() => toggleSection('hemeroteca')}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.archiveBlogs.map((resource, index) => (
          <div key={index} className='admin-library-resource-inputs'>
            <div className='contenedor-titulo-library'>
              <p>Título:</p>
              <input
                className='admin-library-input'
                type='text'
                placeholder='Título'
                value={resource.title.es}
                onChange={(e) =>
                  handleChange(
                    'archiveBlogs',
                    libraryData.archiveBlogs.map((r, i) =>
                      i === index ? { ...r, title: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className='contenedor-enlace-library'>
              <p>Enlace:</p>
              <input
                type='text'
                className='admin-library-input'
                placeholder='Enlace'
                value={resource.link}
                onChange={(e) =>
                  handleChange(
                    'archiveBlogs',
                    libraryData.archiveBlogs.map((r, i) =>
                      i === index ? { ...r, link: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              type='button'
              className='admin-library-button admin-library-button-delete'
              onClick={() => handleDeleteResource('archiveBlogs', index)}
            >
              <i className='fas fa-trash-alt'></i> Eliminar
            </button>
          </div>
        ))}
        <button
          type='button'
          className='admin-library-button archiveBlogsBtn'
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              archiveBlogs: [
                ...prevState.archiveBlogs,
                { title: '', link: '' },
              ],
            }))
          }
        >
          <i className='fas fa-plus'></i> Agregar Recurso
        </button>
      </AccordionSection>

      <button type='button' className='info-button' onClick={toggleModal}>
        ¿Cómo editar la sección de libros?
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ModalInstructions />
      </Modal>
    </form>
  )
}

export default AdminLibrary
