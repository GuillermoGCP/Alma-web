const Hero = ({
  handleCancelTitle,
  handleTitleChange,
  handleImageClick,
  handleFileChange,
  fileInputRef,
  file,
  visibleSection,
  homeData,
  validateAndUpdateField,
}) => {
  return (
    <div className={`section ${visibleSection === 'image' ? 'visible' : ''}`}>
      <h2>Estás editando sección hero</h2>

      <h2 className='title-edit-home'>Imagen principal</h2>
      <img src={file} alt='Hero' className='hero-image' />
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
          value={homeData.titleHome.es || ''}
          onChange={handleTitleChange}
          placeholder='Escribe el título del Home'
        />
        <button
          className='boton-guardar-dashboard'
          onClick={() =>
            validateAndUpdateField('titleHome', homeData.titleHome)
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
