import { useEffect, useState } from 'react'
import FormBuilder from '../FormBuilder'
import EditForm from '../EditForm'
import './CreadorFormularios.css'

import FormDropdown from '../FormDropdown'

const CreadorFormularios = ({ publishedForm, setPublishedForm }) => {
  const [forms, setForms] = useState({})
  const [editingForm, setEditingForm] = useState(false)
  const [selectedForm, setSelectedForm] = useState(null)

  return (
    <div className='contenedor-opciones-formularios'>
      <h1>Formularios</h1>
      {editingForm ? (
        <EditForm
          setEditingForm={setEditingForm}
          selectedForm={selectedForm}
          setForms={setForms}
          setSelectedForm={setSelectedForm}
          setPublishedForm={setPublishedForm}
          publishedForm={publishedForm}
        />
      ) : (
        <>
          <div className='contenedor-pasos'>
            <p>
              En esta sección podéis gestionar vuestros formularios. Desde aquí
              se puede PUBLICAR, CREAR y MODIFICAR los formularios.
              <br></br>
              <br></br>A continuación, tenéis la lista con los eventos
              existentes, clicad en cada uno para ver las opciones disponibles.
              Si deseáis crear uno nuevo, encontraréis el creador de formularios
              al final de la página.
            </p>
          </div>
          <h3 className='titulo-descriptivo-accion'>
            Lista de formularios <i className='fas fa-arrow-down'></i>
          </h3>
          <FormDropdown
            forms={forms}
            setForms={setForms}
            setPublishedForm={setPublishedForm}
            publishedForm={publishedForm}
            setEditingForm={setEditingForm}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
          <div>
            <h3 className='titulo-descriptivo-accion'>
              Creador de formularios <i className='fas fa-arrow-down'></i>
            </h3>
            <div className='contenedor-pasos'>
              <p>
                Los formularios que creéis aquí se añadirán a la lista anterior.{' '}
                <br /> <br />
                CAMPOS: Añadid tantos como datos necesitéis recoger de cada
                participante. Si queréis recoger teléfono o email, usad el campo
                específico para que al usarlo se verifique que os envían números
                y correos válidos.
                <br /> <br />
                Podéis usar el tipo "texto" para todo lo que no encaje con las
                categorías.
              </p>
            </div>
            <FormBuilder setForms={setForms} />
          </div>
        </>
      )}
    </div>
  )
}
export default CreadorFormularios
