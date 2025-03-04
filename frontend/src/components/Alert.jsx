import { useLocation } from "react-router-dom";
import "../App.css";

const Alert = ({ title, date, link }) => {
  const location = useLocation();

  // Si la ruta actual empieza con "/dashboard", no renderiza el Alert
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }
  // Cambia el color del alert según la página
  const alertStyle = {
    backgroundColor:
      location.pathname === "/homepage" || location.pathname === "/"
        ? "#b380b5" // Color morado para la página de inicio
        : "#e0bb8e", // Color alternativo para otras páginas, incluyendo "Quienes Somos"
  };

  return (
    <div className="alert-div" style={alertStyle}>
      <p id="alerttext" className="alert-text">
        <strong className="black">{title}</strong> |
        <span className="normal">{date}</span> |
        <a href={link} className="alert-text-link" target="_blank">
          + INFO
        </a>
      </p>
    </div>
  );
};
export default Alert;
