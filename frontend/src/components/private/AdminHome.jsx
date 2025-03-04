import useAdminHome from '../../hooks/useAdminHome'
import Experiences from './Experiences'
import Nosotras from './Nosotras'
import Hero from './Hero'
import './AdminHome.css'

const AdminHome = ({
    checkedExperiences,
    setCheckedExperiences,
    homeData,
    setHomeData,
}) => {
    const {
        handleSectionChange,
        handleCancelTitle,
        handleCancelText,
        handleTitleChange,
        handleTextChange,
        handleImageClick,
        handleFileChange,
        visibleSection,
        charactersRemaining,
        setCharactersRemaining,
        fileInputRef,
        file,
        MAX_CHARACTERS,
        validateAndUpdateField,
    } = useAdminHome(setHomeData)

    return (
        <main className='settings-content-inicio'>
            <div className='contenedor-secciones-dinamicas-dashboard'>
                <h1 className='titulo-escoger-seccion'>
                    Escoge qué sección quieres editar:
                </h1>
                <div className='panel-nav-btn'>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'image' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('image')}
                    >
                        Hero
                    </button>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'text' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('text')}
                    >
                        Nosotras
                    </button>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'experiences' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('experiences')}
                    >
                        Experiencias Reales
                    </button>
                </div>
            </div>

            <div className='contenedor-secciones-dinamicas-dashboard'>
                <Hero
                    handleCancelTitle={handleCancelTitle}
                    handleTitleChange={handleTitleChange}
                    handleImageClick={handleImageClick}
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                    file={file}
                    visibleSection={visibleSection}
                    homeData={homeData}
                    validateAndUpdateField={validateAndUpdateField}
                />
                <Nosotras
                    homeData={homeData}
                    handleTextChange={handleTextChange}
                    handleCancelText={handleCancelText}
                    MAX_CHARACTERS={MAX_CHARACTERS}
                    validateAndUpdateField={validateAndUpdateField}
                    visibleSection={visibleSection}
                    charactersRemaining={charactersRemaining}
                />

                <Experiences
                    setHomeData={setHomeData}
                    homeData={homeData}
                    setCharactersRemaining={setCharactersRemaining}
                    visibleSection={visibleSection}
                    charactersRemaining={charactersRemaining}
                    MAX_CHARACTERS={MAX_CHARACTERS}
                    checkedExperiences={checkedExperiences}
                    setCheckedExperiences={setCheckedExperiences}
                />
            </div>
        </main>
    )
}

export default AdminHome
