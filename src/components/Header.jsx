import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Header.css'
import useContactInfo from '../hooks/useContactInfo.js'
import logoAlma from '../images/logo-alma.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import MySubscriptionModal from '../components/forms/MySubscriptionModal'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const Header = ({ scrolled }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { generalSettings } = useContactInfo()

  const [activeIndex, setActiveIndex] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Ocultar el Header en rutas específicas (Dashboard o Admin)
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard'))
    return null

  // Cerrar menú al navegar
  useEffect(() => {
    setMenuOpen(false)
    setActiveIndex(null)
  }, [pathname])

  const toggleSubMenu = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  const toggleMenu = () => setMenuOpen((v) => !v)
  const closeMenu = () => {
    setMenuOpen(false)
    setActiveIndex(null)
  }

  const handleUserProfileClick = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const instagramLink = generalSettings?.linkInstagram || ''
  const facebookLink = generalSettings?.linkFacebook || ''
  const logoSrc = generalSettings?.logo || logoAlma

  // Fondo/clases según ruta y scroll
  const isHome = pathname === '/'
  const purpleBg = scrolled || !isHome // morado si no es home o ya hizo scroll
  const isHero = isHome && !scrolled // sobre la imagen de portada

  // helper para NavLink v6
  const navClass = ({ isActive }) => (isActive ? 'active' : undefined)

  return (
    <header
      className={`navbar ${purpleBg ? 'purple' : ''} ${
        isHero ? 'on-hero' : ''
      }`}
    >
      <nav className='navbar ' aria-label='Principal'>
        <Link to='/' className='logo-link' onClick={closeMenu}>
          <img src={logoSrc} alt='Logo de Alma' className='logo' />
        </Link>

        <button
          className='menu-toggle'
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          type='button'
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`social-media ${menuOpen ? 'active' : ''}`}>
          {instagramLink && (
            <a
              href={instagramLink}
              target='_blank'
              rel='noopener noreferrer'
              className='social-media-item'
              aria-label='Ir a Instagram'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {facebookLink && (
            <a
              href={facebookLink}
              target='_blank'
              rel='noopener noreferrer'
              className='social-media-item'
              aria-label='Ir a Facebook'
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          )}
          <button
            className='social-media-item user-icon'
            onClick={handleUserProfileClick}
            aria-label='Tu suscripción'
            title='Tu suscripción'
            type='button'
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          <LanguageSwitcher />
        </div>

        <ul className={`menu ${menuOpen ? 'active' : ''}`}>
          <li className='menu-item'>
            <NavLink to='/' end className={navClass} onClick={closeMenu}>
              {t('homeTitle')}
            </NavLink>
          </li>

          <li className='menu-item'>
            <NavLink
              to='/quienes-somos'
              className={navClass}
              onClick={closeMenu}
            >
              {t('aboutUs')}
            </NavLink>
          </li>

          <li className='menu-item has-submenu'>
            <button
              type='button'
              className='submenu-toggle'
              onClick={() => toggleSubMenu(1)}
              aria-expanded={activeIndex === 1}
              aria-controls='submenu-1'
            >
              {t('activities')}
            </button>
            <ul
              id='submenu-1'
              className={`submenu ${activeIndex === 1 ? 'active' : ''}`}
            >
              <li>
                <NavLink
                  to='/actividades'
                  className={navClass}
                  onClick={closeMenu}
                >
                  {t('nextActivities')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/historico'
                  className={navClass}
                  onClick={closeMenu}
                >
                  {t('instagramFeed')}
                </NavLink>
              </li>
            </ul>
          </li>

          <li className='menu-item'>
            <NavLink to='/biblioteca' className={navClass} onClick={closeMenu}>
              {t('library')}
            </NavLink>
          </li>

          <li className='menu-item'>
            <NavLink to='/colabora' className={navClass} onClick={closeMenu}>
              {t('colab')}
            </NavLink>
          </li>

          <li className='menu-item'>
            <NavLink to='/contacto' className={navClass} onClick={closeMenu}>
              {t('contact')}
            </NavLink>
          </li>
        </ul>
      </nav>

      {isModalOpen && <MySubscriptionModal onClose={closeModal} />}
    </header>
  )
}

export default Header
