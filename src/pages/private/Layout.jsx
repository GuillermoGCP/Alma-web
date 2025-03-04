import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard' // Asegúrate de importar AdminDashboard
// import ProtectPage from '../../components/ProtecPage'

const Layout = () => {
    return (
        <div className='admin-panel'>
            {/* Sidebar del dashboard */}
            {/* Descomentar ProtectPage cuando se vaya a entregar el proyecto */}
            {/* <ProtectPage> */}
            <AdminDashboard />
            {/* </ProtectPage> */}

            {/* Aquí solo se renderiza el contenido de las rutas hijas */}
            <div className='admin-content'>
                <Outlet />
                {/* Esto renderiza el componente correspondiente a la ruta */}
            </div>
        </div>
    )
}

export default Layout
