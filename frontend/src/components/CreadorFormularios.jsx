import { useState } from 'react'
import FormBuilder from './FormBuilder'
import EditForm from './EditForm'
import './CreadorFormularios.css'

import FormDropdown from './FormDropdown'

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
          <FormBuilder setForms={setForms} />
          {Object.keys(forms).length > 0 && (
            <FormDropdown
              forms={forms}
              setForms={setForms}
              setPublishedForm={setPublishedForm}
              publishedForm={publishedForm}
              setEditingForm={setEditingForm}
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
            />
          )}
        </>
      )}
    </div>
  )
}
export default CreadorFormularios
