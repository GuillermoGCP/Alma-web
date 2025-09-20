import AppRoutes from './components/AppRoutes'
import Alert from './components/Alert'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import useApp from './hooks/useApp'
import ScrollToTopButton from './components/ScrollToTopButton'
import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'

function App() {
  const {
    instagramPostList,
    formList,
    instagramPost,
    setInstagramPost,
    publishedForm,
    setPublishedForm,
    activities,
    setActivities,
    checkedExperiences,
    setCheckedExperiences,
    homeData,
    setHomeData,
  } = useApp()

  const appRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (appRef.current) {
        setScrolled(appRef.current.scrollTop > 50)
      }
    }

    const appElement = appRef.current
    if (appElement) {
      appElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (appElement) {
        appElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <Router>
      <div className='App' ref={appRef}>
        <Header scrolled={scrolled} />

        <Alert
          title={'XX CONGRESO DE LACTANCIA MATERNA FEDALMA'}
          date={'3 y 4 de Octubre de 2025'}
          link={'https://www.fedalma.org/congreso-2025/'}
        />
        <AppRoutes
          instagramPost={instagramPost}
          setInstagramPost={setInstagramPost}
          publishedForm={publishedForm}
          setPublishedForm={setPublishedForm}
          activities={activities}
          setActivities={setActivities}
          checkedExperiences={checkedExperiences}
          setCheckedExperiences={setCheckedExperiences}
          homeData={homeData}
          setHomeData={setHomeData}
          formList={formList}
          instagramPostList={instagramPostList}
        />
        <ScrollToTopButton />
      </div>
    </Router>
  )
}

export default App
