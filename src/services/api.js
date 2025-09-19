import formatDate from '../utils/formatDate'

const API_BASE_URL = import.meta.env.VITE_API_URL

const handleResponse = async (response) => {
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message || 'Something went wrong')
  }

  return json.data
}

// Activities
export const createActivityService = async (formData) => {
  for (const [key, value] of formData.entries()) {
  }
  try {
    const response = await fetch(`${API_BASE_URL}/create-activity`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating activity:', error)
    throw error
  }
}

export const joinPartnerActivityService = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-partner-activity`, {
      method: 'POST',
      body: JSON.stringify(activityData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error joining partner activity:', error)
    throw error
  }
}

export const joinFreeActivityService = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-non-partner-activity`, {
      method: 'POST',
      body: JSON.stringify(activityData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error joining free activity:', error)
    throw error
  }
}

// Login
export const loginService = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin-login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Calendario
export const listCalendarEventsService = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list-calendar-events`, {
      method: 'POST',
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error listing calendar events:', error)
    throw error
  }
}

export const getCalendarEventService = async (eventId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-calendar-event/${eventId}`
    )

    return handleResponse(response)
  } catch (error) {
    console.error('Error getting calendar event:', error)
    throw error
  }
}

export const deleteCalendarEventService = async (eventId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delete-calendar-event/${eventId}/true`,
      {
        method: 'DELETE',
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error deleting calendar event:', error)
    throw error
  }
}

export const updateCalendarEventService = async (eventId, formData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/update-calendar-event/${eventId}?image`,
      {
        method: 'PATCH',
        body: formData,
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating calendar event:', error)
    throw error
  }
}

export const cancelCalendarEventService = async (eventId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cancel-calendar-event/${eventId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const responseFinal = await response.json()
    return responseFinal
  } catch (error) {
    console.error('Error updating calendar event:', error)
    throw error
  }
}

// Colaboradores
export const getAllCollaboratorsService = async (isTeamMember) => {
  const isTeamMemberParam = isTeamMember ? isTeamMember : 'false' // Por defecto siempre trae a los miembros
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-all-collaborators/${isTeamMemberParam}`,
      {
        method: 'GET',
      }
    )

    return handleResponse(response)
  } catch (error) {
    console.error('Error obtaining collaborators list:', error)
    throw error
  }
}

export const newCollaboratorService = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/new-collaborator`, {
      method: 'POST',
      body: formData,
    })

    // return handleResponse(response);
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating new collaborator:', error)
    throw error
  }
}

export const deleteCollaboratorService = async (id, team, image) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delete-collaborator/${id}/${team}?image=${encodeURIComponent(
        image
      )}`,
      {
        method: 'DELETE',
      }
    )

    // return handleResponse(response);
    const data = response.json()
    return data
  } catch (error) {
    console.error('Error deleting collaborator:', error)
    throw error
  }
}

export const updateCollaboratorService = async (
  id,
  team,
  prevImage,
  formData
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/update-collaborator/${id}/${team}?image=${encodeURIComponent(
        prevImage
      )}`,
      {
        method: 'PATCH',
        body: formData,
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating collaborator:', error)
    throw error
  }
}

// Contacto
export const saveMessageService = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/new-contact-message`, {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error saving contact message:', error)
    throw error
  }
}

// Socios
export const newPartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newPartner`, {
      method: 'POST',
      body: JSON.stringify(partnerData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error creating new partner:', error)
    throw error
  }
}

export const deletePartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-partner`, {
      method: 'DELETE',
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error deleting partner:', error)
    throw error
  }
}

export const updatePartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-partner`, {
      method: 'PATCH',
      body: JSON.stringify(partnerData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse(response)
  } catch (error) {
    console.error('Error updating partner:', error)
    throw error
  }
}

// Listar todos los eventos pasados
// Función que trae todas las actividades de la URL dada
export async function getPastEvents(endpoint) {
  // Construír la url
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}${endpoint}`

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activitiesFilters),
    })

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

const activitiesFilters = {
  // id: "",
  // summary: ""
  // description: "",
  // exactDate: "Miércoles, 10 de Septiembre de 2025, 12:00",
  // dateFrom: "Miércoles, 01 de Septiembre de 2025, 12:00",
  // dateUntil: "Miércoles, 15 de Septiembre de 2025, 12:00",
  // location: "",
  // access: ""
}

export async function getCalendarEvents(numberOfEvents = 20) {
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}/list-calendar-events`
  const requestBody = {
    maxResults: numberOfEvents,
    orderBy: 'startTime',
    singleEvents: true,
    timeMin: new Date().toISOString(), //Traer los eventos actuales
  }

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    const calendarEvents = data.response
    calendarEvents.forEach((calendarEvent) => {
      calendarEvent.dateISO = formatDate(calendarEvent.start.dateTime)
    })
    return calendarEvents
  } catch (error) {
    console.error('Error fetching past events:', error)
    return null
  }
}

// Función para comparar las fechas en formato ISO

// Eventos pasados (Histórico)
export async function getPastCalendarEvents(numberOfEvents = 50) {
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}/list-calendar-events`
  const requestBody = {
    maxResults: numberOfEvents,
    orderBy: 'startTime',
    singleEvents: true,
    timeMax: new Date().toISOString(), // Traer eventos ya pasados hasta ahora
  }

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    const calendarEvents = Array.isArray(data.response) ? data.response : []

    calendarEvents.forEach((calendarEvent) => {
      const startISO =
        calendarEvent?.start?.dateTime || calendarEvent?.start?.date
      if (startISO) {
        calendarEvent.dateISO = formatDate(startISO)
      }
    })

    // Orden descendente por fecha de inicio (más recientes primero)
    const sorted = calendarEvents.sort((a, b) => {
      const aTime = new Date(
        a?.start?.dateTime || a?.start?.date || 0
      ).getTime()
      const bTime = new Date(
        b?.start?.dateTime || b?.start?.date || 0
      ).getTime()
      return bTime - aTime
    })

    return sorted
  } catch (error) {
    console.error('Error fetching past calendar events:', error)
    return null
  }
}

export function compareISO(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  if (d1.getTime() === d2.getTime()) {
    return 0 // Misma fecha
  } else if (d1.getTime() > d2.getTime()) {
    return 1 // Fecha 1 es posterior a fecha 2
  } else {
    return -1 // Fecha 2 es anterior a fecha 2
  }
}
