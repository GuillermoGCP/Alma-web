import React, { useEffect, useState } from 'react'
import { createEvent, modifyEvent } from '../../services/calendar'
import EventForm from './CreateEventForm'
import { getCalendarEvents } from '../../services/api'

function AdminDashboard() {
  const [eventsList, setEventsList] = useState([])

  useEffect(() => {
    async function getEvents() {
      const calendarEvents = await getCalendarEvents();
      setEventsList(calendarEvents)
    }
    
    getEvents();
  },[])

  return (
    <>
        <menu></menu>
        <nav>
          
          <button onClick={createEvent}>Crear evento de prueba</button>
          {/* <button onClick={modifyEvent}>Modificar evento de prueba</button> */}

          <EventForm />

          <details>
            <summary>Lista de eventos</summary>
          <ol>
          {eventsList.map((event)=>{
            return(
              <li key={event.id}>
                <p>{event.summary}</p>
                <p>{event.location}</p>
                <p>{event.start.dateTime}</p>
              </li>
            )
          })}
          </ol>
          </details>

        </nav>
    </>
  )
}

export default AdminDashboard
