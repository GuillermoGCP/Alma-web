import { deleteCalendarEventService } from '../../../services/api'
import { useTranslation } from 'react-i18next'

function EditableEvent({ eventData, onDelete, onClick }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  async function handleDelete() {
    const response = await deleteCalendarEventService(eventData.id)
    if (response.error) {
      console.error(response)
    } else if (response.message.includes('Evento eliminado')) {
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
    </>
  )
}

export default EditableEvent
