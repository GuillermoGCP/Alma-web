const Nosotras = ({
  homeData,
  handleTextChange,
  handleCancelText,
  MAX_CHARACTERS,
  validateAndUpdateField,
  visibleSection,
  charactersRemaining,
}) => {
  return (
    <div className={`section ${visibleSection === 'text' ? 'visible' : ''}`}>
      <h2>Estás editando sección nosotras</h2>

      <label htmlFor='sectionText'>
        Edita el texto de la sección nosotras:
      </label>
      <textarea
        id='sectionText'
        value={homeData.sectionText.es}
        onChange={handleTextChange}
        placeholder='Escribe el texto para la sección Nosotras'
        maxLength={MAX_CHARACTERS}
      />
      <p>{charactersRemaining} caracteres restantes (Máximo 1800 caracteres)</p>

      <button
        className='boton-guardar-dashboard'
        onClick={() =>
          validateAndUpdateField('sectionText', homeData.sectionText)
        }
      >
        <i className='fas fa-save'></i> Guardar
      </button>

      <button className='boton-cancelar-dashboard' onClick={handleCancelText}>
        <i className='fas fa-times'></i> Cancelar
      </button>
    </div>
  )
}
export default Nosotras
