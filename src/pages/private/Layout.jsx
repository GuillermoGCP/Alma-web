import { Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import ProtectPage from '../../components/ProtecPage'

const Layout = () => {
  return (
    <ProtectPage>
      <div className='admin-panel'>
        <AdminDashboard />
        <div className='admin-content'>
          <Outlet />
        </div>
      </div>
    </ProtectPage>
  )
}

export default Layout
