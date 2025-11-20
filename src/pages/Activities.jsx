import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import MembershipModal from '../components/MembershipModal'
import './Activities.css'

import silueta from '../images/Alma_Lactancia_-_Foto_hero.jpg'
import { getCalendarEvents, getPastCalendarEvents } from '../services/api'
import formatDate from '../utils/formatDate'
import { useTranslation } from 'react-i18next'

const Activities = ({ activities, setActivities }) => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedActivityNumber, setSelectedActivityNumber] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming') // upcoming | past
  const [pastActivities, setPastActivities] = useState([])
  const [pastPage, setPastPage] = useState(1)
  const pageSize = 12

  useEffect(() => {
    async function fetchUpcoming(setActivities) {
      const calendarEvents = await getCalendarEvents()
      if (calendarEvents) {
        setActivities(calendarEvents)
      }
    }

    async function fetchPast() {
      const past = await getPastCalendarEvents(50)
      if (past) setPastActivities(past)
    }

    fetchUpcoming(setActivities)
    fetchPast()
  }, [])

  useEffect(() => {
    if (activeTab === 'past') setPastPage(1)
  }, [activeTab])

  const handleEnrollClick = (activity, activityNumber) => {
    if (activity.summary.includes('EVENTO CANCELADO')) return

    const access = activity.extendedProperties?.private?.access?.trim()
    const exclusiveAccess = ['solo_socios', 'partners']
    if (exclusiveAccess.includes(access)) {
      setShowModal(true)
      setSelectedActivity(activity)
      setSelectedActivityNumber(activityNumber)
    } else {
      enrollUser(activity, activityNumber)
    }
  }

  const enrollUser = async (activity, activityNumber) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-is-published/${
          activity.id
        }/${Number(activityNumber)}/true?eventId=${encodeURIComponent(
          activity.id
        )}`
      )

      if (response.ok) {
        const data = await response.json()
        if (!data.isPublished) {
          window.alert('No se han abierto las inscripciones')
          return
        }
      } else {
        window.alert('No hay formulario publicado')
        return
      }
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`)
    }

    navigate(
      `/formulario-inscripcion/${activity.id}/${activityNumber}/${activity.summary}`,
      {
        state: { activity },
      }
    )
  }

  const totalPastPages = Math.max(
    1,
    Math.ceil(pastActivities.length / pageSize)
  )
  const pagedPast = pastActivities.slice(
    (pastPage - 1) * pageSize,
    pastPage * pageSize
  )
  const list = activeTab === 'upcoming' ? activities : pagedPast

  return (
    <div className='activity-page'>
      <main className='activity-main'>
        <div className='activity-header'>
          <p className='activity-text'>Alma Lactancia</p>
          <h1 className='activity-title'>
            {activeTab === 'upcoming'
              ? t('nextActivities')
              : t('eventsHistory')}
          </h1>
          <div className='activities-tabs'>
            <button
              className={`tab-button ${
                activeTab === 'upcoming' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              {t('nextActivities')}
            </button>
            <button
              className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              {t('eventsHistory')}
            </button>
          </div>
          <p className='activity-description'>
            {activeTab === 'upcoming'
              ? t('activitiesUpcomingDesc')
              : t('activitiesPastDesc')}
          </p>
        </div>

        <ol className='activity-container'>
          {list && list.length > 0 ? (
            list.map((activity, index) => {
              const start = new Date(activity.start.dateTime)
              const end = new Date(activity.end.dateTime)
              const durationInMinutes = Math.floor((end - start) / (1000 * 60))
              const hours = Math.floor(durationInMinutes / 60)
              const minutes = durationInMinutes % 60
              const durationString =
                hours > 0 ? `${hours} h ${minutes} m` : `${minutes} minutos`

              const access =
                activity.extendedProperties?.private?.access?.trim()
              const exclusiveAccess = ['solo_socios', 'partners']
              const accessMessage = exclusiveAccess.includes(access)
                ? 'Exclusivo para socios'
                : 'Abierto a la comunidad'

              return (
                <li key={index} className='activity-cards'>
                  <div className='activity-content'>
                    <div className='activity-image'>
                      {activity?.extendedProperties?.private?.image &&
                      activity.extendedProperties.private.image !==
                        'sin imagen' ? (
                        <img
                          src={activity.extendedProperties.private.image}
                          alt={activity.summary}
                        />
                      ) : (
                        <img src={silueta} alt='Imagen predeterminada' />
                      )}
                    </div>
                    <h1 className='activities-title'>{activity.summary}</h1>
                    <p className='activities-decription'>
                      {activity.description}
                    </p>
                    <p className='activities-location'>
                      {activity.location || 'Lugar'}
                    </p>

                    <h2 className='activities-date'>
                      {formatDate(activity.start.dateTime, null, 'es') ||
                        'Fecha'}
                    </h2>
                    {activeTab === 'upcoming' ? (
                      <>
                        <h2 className='activities-date'>
                          Duración estimada: {durationString || 'Duración'}
                        </h2>
                        <p className='activities-access'>{accessMessage}</p>
                        <button
                          className='activities-inscription'
                          onClick={() => handleEnrollClick(activity, index + 1)}
                        >
                          {activity.summary.includes('EVENTO CANCELADO')
                            ? t('inscriptionsClosed')
                            : t('enroll')}
                        </button>
                      </>
                    ) : (
                      <>
                        <h2 className='activities-date'>
                          {t('eventFinished')}
                        </h2>
                      </>
                    )}
                  </div>
                </li>
              )
            })
          ) : (
            <p className='no-activities-found'>
              {activeTab === 'upcoming'
                ? t('noUpcomingActivities')
                : t('noPastEvents')}
            </p>
          )}
        </ol>
        {activeTab === 'past' && pastActivities.length > pageSize && (
          <div className='pagination'>
            <button
              className='page-btn'
              disabled={pastPage === 1}
              onClick={() => setPastPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <span className='page-info'>
              {pastPage} / {totalPastPages}
            </span>
            <button
              className='page-btn'
              disabled={pastPage === totalPastPages}
              onClick={() =>
                setPastPage((p) => Math.min(totalPastPages, p + 1))
              }
            >
              Siguiente
            </button>
          </div>
        )}
      </main>

      {/* Modal de validación de ID */}
      <MembershipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onVerify={() => enrollUser(selectedActivity, selectedActivityNumber)}
      />

      <Footer />
    </div>
  )
}

export default Activities
