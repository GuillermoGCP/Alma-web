import React from 'react'
import { deleteCalendarEventService } from '../../../services/api'
import formatDate from '../../../utils/formatDate'
import { useTranslation } from 'react-i18next'

function EditableEvent({ eventData, onDelete, onClick }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  async function handleDelete() {
    console.log('Eliminando evento...', {
      título: eventData.summary,
      lugar: eventData.location,
      fecha: eventData.start.dateTime,
    })

    console.log('Deleting...', eventData.id)
    // TODO - Mostrar proceso de borrado (loading)

    const response = await deleteCalendarEventService(eventData.id)
    if (response.error) {
      console.error(response)
    } else if (response.message.includes('Evento eliminado')) {
      console.log(response)
      onDelete(eventData.id)
    }
  }

  return (
    <>
      <li style={{ listStyle: 'none' }}>
        <button className='list-btn' onClick={onClick}>
          {eventData.summary}
        </button>
      </li>
      {/* <li key={eventData.id} className='admin-list'>
    <h2>{eventData.summary}</h2>
    <p>{eventData.location}</p>
    <p>{eventData.start.dateTime}</p>
    <button onClick={handleDelete}>Borrar</button>
    <button onClick={handleUpdate}>Modificar</button>
  </li> */}
    </>
  )
}

export default EditableEvent
