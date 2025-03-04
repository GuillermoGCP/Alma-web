import React, { useEffect, useState } from 'react'
import { getCalendarEvents } from '../../services/api'
import './AdminActivities.css'
import EventForm from '../../pages/private/CreateEventForm'
import EditableEvent from './Modals/editableEvent'
import formatDate from '../../utils/formatDate'
import './Modals/editableList.css'

const AdminActivities = () => {
  // Sacar los eventos
  const [toEdit, setToEdit] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [eventsList, setEventsList] = useState([])

  function toggleEditMode(activityData) {
    setIsEditMode((prevValue) => !prevValue)
    setToEdit(activityData)
  }

  async function getEvents() {
    const calendarEvents = await getCalendarEvents()
    // console.log(calendarEvents);
    setEventsList(calendarEvents)
  }

  useEffect(() => {
    getEvents() // Con carga de la página
  }, [])

  // Funciones para actualizar la lista al gestionar eventos
  function deleteEvent(eventId) {
    setEventsList((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    )
  }

  function refreshEventsList() {
    toggleEditMode({})
    getEvents()
  }

  return (
    <main className='settings-content margin-left-box'>
      <h1 className='titulo-actividades-principal'>Actividades</h1>
      <div id='activities-display' className={isEditMode ? 'hidden' : ''}>
        <p className='texto-descriptivo-accion'>
          Selecciona la actividad que deseas editar:
        </p>
        <ol>
          {eventsList.map((activity) => {
            return (
              <EditableEvent
                key={activity.id}
                onClick={() => toggleEditMode(activity)}
                setToEdit={setToEdit}
                eventData={activity}
                onDelete={() => deleteEvent(activity.id)}
              />
            )
          })}
        </ol>

        <h1 className='titulo-creador-actividades'>Creador de actividades</h1>
        <button onClick={() => toggleEditMode()} className='confirm-btn'>
          Crear nueva actividad
        </button>
      </div>
      <div className={!isEditMode ? 'hidden' : ''}>
        <button
          onClick={() => toggleEditMode({})}
          className='confirm-btn'
          style={{ marginBottom: '1rem' }}
        >
          <i className='fas fa-arrow-left'></i> Volver atrás
        </button>
        {/* <p className="texto-editando-nosotras">
          Editando: {toEdit?.summary || "Nueva actividad"}
        </p>
        <p className="texto-editando-nosotras">
          Fecha:{" "}
          {toEdit?.start
            ? formatDate(toEdit.start.dateTime)
            : "Fecha no especificada"}
        </p> */}

        <EventForm toEdit={toEdit} onSuccess={refreshEventsList} />
      </div>
    </main>
  )
}

export default AdminActivities
