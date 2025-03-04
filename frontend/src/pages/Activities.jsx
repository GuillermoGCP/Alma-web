import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MembershipModal from "../components/MembershipModal";
import "./Activities.css";

import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import { getCalendarEvents } from "../services/api";
import formatDate from "../utils/formatDate";
import { useTranslation } from "react-i18next";

const Activities = ({ activities, setActivities }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedActivityNumber, setSelectedActivityNumber] = useState(null);

  useEffect(() => {
    async function fetchCalendar(setActivities) {
      const calendarEvents = await getCalendarEvents();
      if (calendarEvents) {
        setActivities(calendarEvents);
      }
    }

    fetchCalendar(setActivities);
  }, []);

  const handleEnrollClick = (activity, activityNumber) => {
    console.log("Estado del modal:", showModal);

    if (activity.summary.includes("EVENTO CANCELADO")) return;

    const access = activity.extendedProperties?.private?.access?.trim();
    console.log("Acceso requerido:", access); // Verifica qué valor se obtiene

    const exclusiveAccess = ["solo_socios", "partners"];
    if (exclusiveAccess.includes(access)) {
      console.log("Actividad exclusiva para socios. Abriendo modal...");
      setShowModal(true);
      setSelectedActivity(activity);
      setSelectedActivityNumber(activityNumber);
    } else {
      console.log("Actividad abierta a todos. Redirigiendo a inscripción...");
      enrollUser(activity, activityNumber);
    }
  };

  const enrollUser = async (activity, activityNumber) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-is-published/${
          activity.id
        }/${Number(activityNumber)}/true`
      );

      if (response.ok) {
        const data = await response.json();
        if (!data.isPublished) {
          window.alert("No se han abierto las inscripciones");
          return;
        }
      } else {
        window.alert("No hay formulario publicado");
        return;
      }
    } catch (error) {
      console.log(`Ha ocurrido un error: ${error.message}`);
    }

    navigate(
      `/formulario-inscripcion/${activity.id}/${activityNumber}/${activity.summary}`,
      {
        state: { activity },
      }
    );
  };

  return (
    <div className="activity-page">
      <main className="activity-main">
        <div className="activity-header">
          <p className="activity-text">Alma Lactancia</p>
          <h1 className="activity-title">Próximas actividades</h1>
          <p className="activity-description">
            Aquí podrás encontrar información sobre las próximas reuniones,
            charlas y talleres que organizamos. Únete a nosotros en estos
            eventos donde compartimos conocimientos, experiencias y apoyo en un
            ambiente acogedor y enriquecedor.
          </p>
        </div>

        <ol className="activity-container">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const start = new Date(activity.start.dateTime);
              const end = new Date(activity.end.dateTime);
              const durationInMinutes = Math.floor((end - start) / (1000 * 60));
              const hours = Math.floor(durationInMinutes / 60);
              const minutes = durationInMinutes % 60;
              const durationString =
                hours > 0 ? `${hours} h ${minutes} m` : `${minutes} minutos`;

              const access =
                activity.extendedProperties?.private?.access?.trim();
              const exclusiveAccess = ["solo_socios", "partners"];
              const accessMessage = exclusiveAccess.includes(access)
                ? "Exclusivo para socios"
                : "Abierto a la comunidad";

              return (
                <li key={index} className="activity-cards">
                  <div className="activity-content">
                    <div className="activity-image">
                      {activity.extendedProperties.private.image &&
                      activity.extendedProperties.private.image !==
                        "sin imagen" ? (
                        <img
                          src={activity.extendedProperties.private.image}
                          alt={activity.summary}
                        />
                      ) : (
                        <img src={silueta} alt="Imagen predeterminada" />
                      )}
                    </div>
                    <h1 className="activities-title">{activity.summary}</h1>
                    <p className="activities-decription">
                      {activity.description}
                    </p>
                    <p className="activities-location">
                      {activity.location || "Lugar"}
                    </p>

                    <h2 className="activities-date">
                      {formatDate(activity.start.dateTime, null, "es") ||
                        "Fecha"}
                    </h2>
                    <h2 className="activities-date">
                      Duración estimada: {durationString || "Duración"}
                    </h2>
                    <p className="activities-access">{accessMessage}</p>

                    <button
                      className="activities-inscription"
                      onClick={() => handleEnrollClick(activity, index + 1)}
                    >
                      {activity.summary.includes("EVENTO CANCELADO")
                        ? "Inscripciones cerradas"
                        : "Inscribirse"}
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No se han podido cargar las actividades pasadas</p>
          )}
        </ol>
      </main>

      {/* Modal de validación de ID */}
      <MembershipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onVerify={() => enrollUser(selectedActivity, selectedActivityNumber)}
      />

      <Footer />
    </div>
  );
};

export default Activities;
