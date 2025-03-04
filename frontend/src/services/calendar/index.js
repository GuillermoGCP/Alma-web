//* Fetch para borrar eventos
export async function deleteEvent(requestBody) {
    console.log(requestBody)
}

//* Fetch para crear eventos
export async function createEvent(formData) {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-activity`,
        {
            method: 'POST',
            body: formData
        }
    )

    if (!response.ok) {
        const error = await response.json()
        return error
    }

    const data = await response.json()
    return data
}

export async function modifyEvent(newEventData) {
    console.warn('Error en api')

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update-calendar-event/${
            newEventData.id
        }`,
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEventData),
        }
    )

    if (!response.ok) {
        console.warn('Error en el fetch:', response)
        return
    }

    const data = await response.json()

    return data
}

// PETICIÓN DE PRUEBA, CREAR O MODIFICAR UN EVENTO

// const requestBodyExample = {
//       summary: "Preparación para el Parto",
//       description: "Una charla informativa organizada por nuestra ONG sobre la preparación para el parto y los cuidados postparto. Ideal para futuras madres y padres.", // Event description
//       start: {
//         dateTime: "2024-10-18T11:00:00+02:00",
//         timeZone: "Europe/Madrid"
//       },
//       end: {
//         dateTime: "2024-10-24T15:00:00+02:00",
//         timeZone: "Europe/Madrid"
//       },
//       location: "Centro Cívico de Monte Alto, A Coruña, ES",
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: "email", "minutes": 1440 },
//           { method: "popup", "minutes": 30 }
//         ]
//       },
//       visibility: "public",
//       access: "partners"
//     }
