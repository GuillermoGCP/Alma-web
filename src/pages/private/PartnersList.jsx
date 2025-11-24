import { useEffect, useState } from 'react'
import { getPartnersService as defaultGetPartnersService } from '../../services/api'
import './PartnersList.css'

const PartnersList = ({ getPartnersService = defaultGetPartnersService }) => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersData = await getPartnersService()
        setPartners(partnersData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [getPartnersService])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='partners-list'>
      <h2>Lista de Socios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner, index) => {
            const nombre = partner.nombre || partner.name || partner[0] || ''
            const email = partner.email || partner.correo || partner[1] || ''
            const telefono =
              partner.telefono || partner['teléfono'] || partner[2] || ''

            return (
              <tr key={index}>
                <td>{nombre}</td>
                <td>{email}</td>
                <td>{telefono}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PartnersList
