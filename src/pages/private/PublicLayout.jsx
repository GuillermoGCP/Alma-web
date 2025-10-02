import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Alert from '../../components/Alert'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import '../../App.css'

const PublicLayout = () => {
  const containerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const handleScroll = () => {
      setScrolled(node.scrollTop > 50)
    }

    node.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      node.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='App' ref={containerRef}>
      <Header scrolled={scrolled} />
      <Alert
        title='XX CONGRESO DE LACTANCIA MATERNA FEDALMA'
        date='3 y 4 de Octubre de 2025'
        link='https://www.fedalma.org/congreso-2025/'
      />
      <Outlet />
      <ScrollToTopButton />
    </div>
  )
}

export default PublicLayout
