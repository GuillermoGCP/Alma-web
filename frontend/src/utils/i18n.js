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
