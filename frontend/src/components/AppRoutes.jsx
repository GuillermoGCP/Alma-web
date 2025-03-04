import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Activities from '../pages/Activities'
import Home from '../pages/Home'
import NotFoundPage from '../pages/NotFoundPage'
import History from '../pages/History'
import Library from '../pages/Library'
import Collaborate from '../pages/Collaborate'
import Contact from '../pages/Contact'
import Confirmation from '../pages/MsgConfirmation'
import Layout from '../pages/private/Layout'
import AdminGeneral from './private/AdminGeneral'
import AdminHome from './private/AdminHome'
import AdminAbout from './private/AdminAbout'
import AdminActivities from './private/AdminActivities'
import AdminHistorical from './private/AdminHistorical'
import AdminLibrary from './private/AdminLibrary'
import CreadorFormularios from './private/CreadorFormularios'
import FormActivityPage from '../pages/FormActivityPage'

const AppRoutes = ({
    homeData,
    setHomeData,
    setActivities,
    activities,
    instagramPost,
    setInstagramPost,
    instagramPostList,
    checkedExperiences,
    setCheckedExperiences,
    publishedForm,
    setPublishedForm,
}) => {
    return (
        <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/' element={<Home homeData={homeData} />} />
            <Route path='/quienes-somos' element={<About />} />
            <Route
                path='/actividades'
                element={
                    <Activities
                        setActivities={setActivities}
                        activities={activities}
                    />
                }
            />
            <Route
                path='/historico'
                element={
                    <History
                        instagramPost={instagramPost}
                        instagramPostList={instagramPostList}
                    />
                }
            />
            <Route path='/biblioteca' element={<Library />} />
            <Route path='/colabora' element={<Collaborate />} />
            <Route path='/contacto' element={<Contact />} />
            <Route path='/confirmacion' element={<Confirmation />} />
            <Route
                path='/formulario-inscripcion/:eventId/:activityNumber/:title'
                element={<FormActivityPage />}
            />
            {/* 
  

            {/* Rutas del DASHBOARD */}
            <Route path='/dashboard' element={<Layout />}>
                {/* Redireccionar a 'general' cuando se accede a /dashboard */}
                <Route path='general' element={<AdminGeneral />} />
                <Route
                    path='inicio'
                    element={
                        <AdminHome
                            checkedExperiences={checkedExperiences}
                            setCheckedExperiences={setCheckedExperiences}
                            homeData={homeData}
                            setHomeData={setHomeData}
                        />
                    }
                />
                <Route path='quienes-somos' element={<AdminAbout />} />
                <Route path='actividades' element={<AdminActivities />} />
                <Route
                    path='historico'
                    element={
                        <AdminHistorical
                            instagramPost={instagramPost}
                            setInstagramPost={setInstagramPost}
                        />
                    }
                />
                <Route path='biblioteca' element={<AdminLibrary />} />
                <Route
                    path='CreadorFormularios'
                    element={
                        <CreadorFormularios
                            publishedForm={publishedForm}
                            setPublishedForm={setPublishedForm}
                        />
                    }
                />
            </Route>
        </Routes>
    )
}
export default AppRoutes
