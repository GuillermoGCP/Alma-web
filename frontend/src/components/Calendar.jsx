import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import CustomToolbar from './CustomToolbar'
import ActivityCard from './ActivityCard'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import { useTranslation } from 'react-i18next'

moment.updateLocale('es', {
  week: {
    dow: 1, // Establece que el primer día de la semana es lunes
    doy: 4, // El primer día del año debe ser un lunes
  },
})

const localizer = momentLocalizer(moment)

const messages = {
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  today: 'Hoy',
  previous: 'Anterior',
  next: 'Siguiente',
  sunday: 'dom',
  monday: 'lu',
  tuesday: 'ma',
  wednesday: 'mié',
  thursday: 'jue',
  friday: 'vie',
  saturday: 'sáb',
  showMore: (total) => `+ Ver más (${total})`,
}

const MyCalendar = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/list-calendar-events`,
          {
            method: 'POST',
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        const eventsArray = Array.isArray(data.response)
          ? data.response
          : (data && data.events) || []

        const formattedEvents = eventsArray.map((event) => ({
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          id: event.id,
          description: event.description || '',
          image: event.extendedProperties?.private?.image || '',
          access: event.extendedProperties?.private?.access || '',
          location: event.location || '',
          glSummary: event.extendedProperties?.private?.glSummary || '',
          glDescription: event.extendedProperties?.private?.glDescription || '',
        }))

        const now = new Date()
        const futureEvents = formattedEvents.filter((event) => {
          return new Date(event.end).getTime() > now.getTime()
        })

        const sortedEvents = futureEvents.sort(
          (a, b) => new Date(a.start) - new Date(b.start)
        )

        // Filtra los eventos para eliminar duplicados basándose en el título
        const uniqueSortedEvents = sortedEvents.filter(
          (event, index, self) =>
            index === self.findIndex((e) => e.title === event.title)
        )

        // Toma solo los primeros 3 eventos únicos
        setEvents(uniqueSortedEvents.slice(0, 3))
      } catch (error) {
        setError('Error fetching events')
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatEventDate = (date) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }
    let formattedDate = new Date(date).toLocaleDateString('es-ES', options)
    formattedDate = formattedDate.replace(',', '').replace(',', ' |')
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setSelectedDate(event.start)
  }

  const handleSelectSlot = (slotInfo) => {
    const event = events.find(
      (event) =>
        new Date(event.start).toLocaleDateString() ===
        new Date(slotInfo.start).toLocaleDateString()
    )
    setSelectedEvent(event || null)
    setSelectedDate(slotInfo.start)
  }

  const handleDayClick = (slotInfo) => {
    const event = events.find(
      (event) =>
        new Date(event.start).toLocaleDateString() ===
        new Date(slotInfo).toLocaleDateString()
    )
    setSelectedEvent(event || null)
  }

  return (
    <div className='calendar-section'>
      <h2 className='section-title-activity'>{t('proximasActividadesHome')}</h2>
      <div>
        {loading ? (
          <p>Cargando actividades...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ActivityCard events={events.slice(0, 3)} currentLang={currentLang} />
        )}
      </div>
      <div className='contenedor-ver-actividades-inicio'>
        <button
          className='boton-ver-actividades'
          onClick={() => navigate('/actividades')}
        >
          {t('verActividadesCalendar')}
        </button>
      </div>
      <h2 className='section-title-calendar'>{t('tituloCalendario')}</h2>
      <div className='calendar-content'>
        <div className='calendar-container'>
          <div className='event-details'>
            {selectedEvent ? (
              <div className='event-all'>
                <div className='event-image-text'>
                  <div className='event-image'>
                    <img
                      src={selectedEvent.image || silueta}
                      alt='imagen actividad'
                      className='attachment-image'
                    />
                  </div>
                  <div className='event-info'>
                    <h3 className='event-title'>{selectedEvent.title}</h3>
                    <p className='event-date'>
                      {formatEventDate(selectedEvent.start)}
                    </p>
                    <p className='event-description'>
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className='no-events'>
                {selectedDate ? (
                  <>
                    {t('noHayEventosProgramados')}
                    <br />
                    <strong>
                      {new Date(selectedDate).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </strong>
                  </>
                ) : (
                  'No hay eventos programados para este día.'
                )}
              </p>
            )}
          </div>
          <div className='calendar-wrapper'>
            {loading ? (
              <p>{t('cargandoCalendario')}</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                onDrillDown={handleDayClick}
                components={{ toolbar: CustomToolbar }}
                messages={messages}
                className='calendar'
                views={{ month: true }}
                popup={false}
                dayPropGetter={(date) => {
                  const hasEvent = events.some(
                    (event) =>
                      new Date(event.start).toDateString() ===
                      date.toDateString()
                  )
                  const isSelected =
                    selectedDate &&
                    date.toDateString() === selectedDate.toDateString()
                  return {
                    className: `${isSelected ? 'selected-day' : ''} ${
                      hasEvent ? 'day-with-event' : ''
                    }`,
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className='calendar-legend'>
          <div className='legend-item'>
            <span className='legend-color color-cuadrado-leyenda'></span>
            <span>Día actual</span>
          </div>
          <div className='legend-item'>
            <span className='legend-color leyenda-dia-con-evento'></span>
            <span>{t('diasConActividad')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCalendar
