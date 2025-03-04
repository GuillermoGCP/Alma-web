import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import formatDate from "../utils/formatDate";
import "./ActivityCard.css";

const ActivityCard = ({ events, currentLang }) => {
  if (!events || events.length === 0) {
    return <p>No se encontraron actividades.</p>;
  }

  return (
    <div className="activities-container">
      {events.map((event) => (
        <div key={event.id} className="activity">
          <div className="card-inner">
            <div className="card-front">
              <div className="activity-image-home">
                {event.image && event.image !== "sin imagen" ? (
                  <img
                    src={event.image}
                    alt="imagen actividad"
                    className="attachment-image"
                  />
                ) : (
                  <img
                    src={silueta}
                    alt="Imagen predeterminada"
                    className="attachment-image"
                  />
                )}
              </div>
              <p className="event-title">
                {currentLang === "es"
                  ? event.title
                  : event.glSummary || event.title}
              </p>
              <p className="event-date">
                {formatDate(event.start, null, currentLang)}
              </p>
            </div>
            <div className="card-back">
              <p className="event-title">
                {currentLang === "es"
                  ? event.title
                  : event.glSummary || event.title}
              </p>
              <p className="event-speaker">
                {currentLang === "es"
                  ? event.description
                  : event.glDescription || event.description}
              </p>
              <p className="event-date">
                {formatDate(event.start, null, currentLang)}
              </p>
              <i className="fas fa-map-marker-alt icon-location"></i>
              <div className="location">
                <p>{event.location}</p>
              </div>
              {event.access && (
                <p className="event-type">
                  {event.access === "solo_socios"
                    ? "Evento solo para socios/as"
                    : "Evento abierto a la comunidad"}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ActivityCard;
