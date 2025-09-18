import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import traduccionesHome from "./traducciones/traduccionesHome";
import traduccionesCalendar from "./traducciones/traduccionesCalendar";
import traduccionesEquipo from "./traducciones/traduccionesEquipo";
import traduccionesFooter from "./traducciones/traduccionesFooter";
import traduccionesColabora from "./traducciones/traduccionesColabora";
import traduccionesBiblioteca from "./traducciones/traduccionesBiblioteca";

const resources = {
  es: {
    translation: {
      welcomeMessage: "Bienvenido a Alma Lactancia",
      homeTitle: "Inicio",
      aboutUs: "¿Quiénes somos?",
      activities: "Actividades",
      nextActivities: "Próximas actividades",
      history: "Histórico",
      library: "Biblioteca",
      colab: "Colabora",
      contact: "Contacto",
      instagramFeed: "Feed Instagram",
      eventsHistory: "Historico de eventos",
      activitiesUpcomingDesc: "Aqui podras encontrar informacion sobre las proximas reuniones, charlas y talleres que organizamos.",
      activitiesPastDesc: "Explora el historico de eventos ya celebrados, con titulo, fecha e imagen si esta disponible.",
      eventFinished: "Evento finalizado",
      noUpcomingActivities: "No se han podido cargar las proximas actividades",
      noPastEvents: "No se han podido cargar los eventos pasados",
      enroll: "Inscribirse",
      inscriptionsClosed: "Inscripciones cerradas",
      instagramFeed: "Feed Instagram",
      ...traduccionesHome.es,
      ...traduccionesCalendar.es,
      ...traduccionesEquipo.es,
      ...traduccionesFooter.es,
      ...traduccionesColabora.es,
      ...traduccionesBiblioteca.es,
    },
  },
  gl: {
    translation: {
      welcomeMessage: "Benvido á Alma Lactancia",
      homeTitle: "Comeza",
      aboutUs: "Quen somos?",
      activities: "Actividades",
      nextActivities: "Próximas actividades",
      history: "Histórico",
      library: "Biblioteca",
      colab: "Colaborar",
      contact: "Contacto",
      instagramFeed: "Feed Instagram",
      eventsHistory: "Historico de eventos",
      activitiesUpcomingDesc: "Aqui podes atopar informacion sobre as proximas actividades.",
      activitiesPastDesc: "Explora o historico de eventos xa celebrados.",
      eventFinished: "Evento rematado",
      noUpcomingActivities: "Non se puideron cargar as proximas actividades",
      noPastEvents: "Non se puideron cargar os eventos pasados",
      enroll: "Inscribirse",
      inscriptionsClosed: "Inscricions pechadas",
      instagramFeed: "Feed Instagram",
      ...traduccionesHome.gl,
      ...traduccionesCalendar.gl,
      ...traduccionesEquipo.gl,
      ...traduccionesFooter.gl,
      ...traduccionesColabora.gl,
      ...traduccionesBiblioteca.gl,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "es",
  fallbackLng: "es", // Idioma en caso de que no exista la traducción
  interpolation: {
    escapeValue: false, // React ya escapa valores automáticamente
  },
});

export default i18n;
