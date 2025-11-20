import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PartnersList from '../src/pages/private/PartnersList.jsx'
import React from 'react'

describe('PartnersList', () => {
  test('renders loading state initially', () => {
    render(<PartnersList getPartnersService={() => new Promise(() => {})} />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  test('renders partners correctly after loading', async () => {
    const mockPartners = [
      { nombre: 'John Doe', email: 'john.doe@example.com', telefono: '123456789' },
      { nombre: 'Jane Doe', email: 'jane.doe@example.com', telefono: '987654321' },
    ]
    render(<PartnersList getPartnersService={() => Promise.resolve(mockPartners)} />)

    expect(await screen.findByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument()
  })

  test('renders error message if loading fails', async () => {
    render(<PartnersList getPartnersService={() => Promise.reject(new Error('Failed to fetch'))} />)
    expect(await screen.findByText('Error: Failed to fetch')).toBeInTheDocument()
  })
})