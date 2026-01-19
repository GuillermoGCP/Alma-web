import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AdminLibrary from '../src/components/private/AdminLibrary';
import useAdminLibrary from '../src/hooks/useAdminLibrary';

// Mock dependencias
vi.mock('../src/hooks/useAdminLibrary');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'es' },
  }),
}));
vi.mock('../src/modal/ModalBooks', () => ({ default: () => <div>ModalBooks</div> }));
vi.mock('../src/modal/ModalInstructions', () => ({ default: () => <div>ModalInstructions</div> }));

describe('AdminLibrary Component', () => {
  const mockHandleChange = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockSetLibraryData = vi.fn();

  const initialLibraryData = {
    lactationResources: [
      { title: { es: 'Recurso 1' }, link: 'http://test.com/1' }
    ],
    lactationBooks: '',
    pregnancyResources: [],
    pregnancyBooks: '',
    parentingResources: [],
    parentingBooks: '',
    nutritionBlogs: [],
    nutritionBooks: '',
    archiveBlogs: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useAdminLibrary.mockReturnValue({
      libraryData: initialLibraryData,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      setLibraryData: mockSetLibraryData,
      MAX_CHARACTERS: 1000,
    });
  });

  it('renders correctly', () => {
    render(<AdminLibrary />);
    expect(screen.getByText('Libreria')).toBeInTheDocument();
  });

  it('updates title with correct object structure when typing', async () => {
    render(<AdminLibrary />);
    
    // Abrir sección Lactancia (está cerrada por defecto en el acordeón, pero el contenido se renderiza si está abierto.
    // Wait, el componente AccordionSection solo renderiza children si isOpen es true.
    // Necesitamos hacer click en el título para abrirlo.
    
    const accordionTitle = screen.getByText(/Lactancia/i);
    fireEvent.click(accordionTitle);

    // Ahora deberíamos ver el input
    const titleInput = screen.getByPlaceholderText('Título'); // Hay varios, pero el primero será el de lactancia
    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe('Recurso 1');

    // Simular escritura
    fireEvent.change(titleInput, { target: { value: 'Nuevo Titulo' } });

    // Verificar que handleChange se llamó con la estructura correcta
    // El código original hacía: { ...r, title: e.target.value } (MAL)
    // El código arreglado hace: { ...r, title: { ...r.title, es: e.target.value } } (BIEN)
    
    expect(mockHandleChange).toHaveBeenCalledWith(
      'lactationResources',
      expect.arrayContaining([
        expect.objectContaining({
          title: { es: 'Nuevo Titulo' },
          link: 'http://test.com/1'
        })
      ])
    );
    
    // Verificar que NO se llamó con string plano
    const lastCallArgs = mockHandleChange.mock.calls[0];
    const newResources = lastCallArgs[1];
    expect(typeof newResources[0].title).not.toBe('string');
    expect(newResources[0].title.es).toBe('Nuevo Titulo');
  });

  it('adds a new resource with correct initial structure', async () => {
    render(<AdminLibrary />);
    
    const accordionTitle = screen.getByText(/Lactancia/i);
    fireEvent.click(accordionTitle);
    
    // Buscar botón de agregar
    const addButton = screen.getByText(/Agregar Recurso/i);
    fireEvent.click(addButton);

    expect(mockSetLibraryData).toHaveBeenCalled();
    // Necesitamos verificar que la función de update recibida por setLibraryData
    // produce el estado correcto. 
    
    // Mockeamos la implementación para capturar el callback
    const updateFn = mockSetLibraryData.mock.calls[0][0];
    const newState = updateFn(initialLibraryData);
    
    const newResource = newState.lactationResources[newState.lactationResources.length - 1];
    
    // Verificación Crítica: El nuevo recurso debe tener title: { es: '' }
    expect(newResource.title).toEqual({ es: '' });
    expect(newResource.title).not.toBe('');
  });
});
