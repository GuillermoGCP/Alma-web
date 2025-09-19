const Hero = ({
  handleCancelTitle,
  handleTitleChange, // debe actualizar titleHome.es (ver hook abajo)
  handleImageClick,
  handleFileChange,
  fileInputRef,
  file, // puede ser URL (string) o File
  visibleSection,
  homeData,
  validateAndUpdateField,
}) => {
  // si file es File, haz un preview temporal
  const imageSrc =
    typeof file === 'string'
      ? file
      : file instanceof File
      ? URL.createObjectURL(file)
      : ''

  const titleEs = homeData?.titleHome?.es ?? ''

  return (
    <div className={`section ${visibleSection === 'image' ? 'visible' : ''}`}>
      <h2>Estás editando sección hero</h2>

      <h2 className='title-edit-home'>Imagen principal</h2>
      <img src={imageSrc} alt='Hero' className='hero-image' />

      <div className='image-buttons'>
        <button onClick={handleImageClick}>Cambiar imagen</button>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <div className='title-input'>
        <h2 className='title-edit-home'>Estás editando el texto del CTA</h2>

        <input
          className='editTitle-input'
          type='text'
          value={titleEs}
          onChange={handleTitleChange} // ver hook
          placeholder='Escribe el título del Home'
        />

        <button
          className='boton-guardar-dashboard'
          onClick={() =>
            validateAndUpdateField(
              'titleHome',
              homeData?.titleHome ?? { es: '', gl: '' }
            )
          }
        >
          <i className='fas fa-save'></i> Guardar
        </button>

        <button
          className='boton-cancelar-dashboard'
          onClick={handleCancelTitle}
        >
          <i className='fas fa-times'></i> Cancelar
        </button>
      </div>
    </div>
  )
}

export default Hero
