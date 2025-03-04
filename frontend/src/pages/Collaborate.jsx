import React, { useState } from "react";
import "./Collaborate.css";
import Header from "../components/Header";
import NewCollaboratorForm from "../components/forms/NewCollaboratorForm";
import { Link } from "react-router-dom";
import MySubscriptionModal from "../components/forms/MySubscriptionModal"; // Asegúrate de importar el modal
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const Collaborate = () => {
  const { t } = useTranslation();

  // Paso 1: Definir el estado isModalOpen para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paso 2: Función para abrir el modal
  const handleUserProfileClick = () => {
    setIsModalOpen(true);
  };

  // Paso 3: Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="collaborate-page">
      <div className="collaborate-content">
        <div className="columna-1">
          <p className="alma-text-colab">Alma Lactancia</p>

          <h1 className="colabora-title">
            {" "}
            {/*TEXTO QUIERES COLABORAR TRADUCIDO*/}
            {t("quieresColab")}
          </h1>
          <p className="texto-inscripcion-socios">
            {/*TEXTO QUIERES COLABORAR TRADUCIDO*/}
            {t("textoRellenaFormularioColab")}
          </p>

          <NewCollaboratorForm />

          <p className="letra-pequena-inscripcion-socios">
            {t("letraPequenaColab")}
          </p>
        </div>
        <div className="columna-2">
          <div className="info-box">
            <h2> {t("tambienPuedes")}</h2>

            <h3>{t("hacerDonativoTitulo")}</h3>
            <p className="texto-socios">{t("hacerDonativoTexto")}</p>
            <h3>{t("asesoraTitulo")}</h3>
            <p className="texto-socios">{t("asesoraTexto")}</p>
            <h3>{t("colaboraPuntualTitulo")}</h3>
            <p className="texto-socios">{t("colaboraPuntualTexto")}</p>

            {/* Botón de contacto */}
            <Link to="/contacto" className="boton-escribenos">
              Escríbenos ➜
            </Link>
            {/* Nueva sección para el botón de suscripción */}
            <div className="suscripcion-info">
              <h3 className="texto-ya-socio">{t("preguntaYaMiembro")}</h3>
              <button
                className="boton-suscripcion"
                onClick={handleUserProfileClick} // Cuando se hace clic, abrir el modal
              >
                {t("verSuscripcion")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Paso 4: Mostrar el modal solo cuando isModalOpen sea true */}
      {isModalOpen && <MySubscriptionModal onClose={closeModal} />}

      <Footer />
    </div>
  );
};

export default Collaborate;
