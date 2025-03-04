import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Importar el ícono de cerrar sesión
import clearSessionData from "../utils/clearSessionData";
import "./LogoutButton.css"; // Importar los estilos del botón

function LogoutButton() {
  const navigate = useNavigate();
  const logout = import.meta.env.VITE_API_URL + "/logout";

  const handleLogout = async () => {
    try {
      const logoutGoogle = () => {
        const logoutURL = "https://accounts.google.com/logout";
        window.open(logoutURL, "_blank", "width=500,height=500");
      };

      const response = await fetch(logout, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        logoutGoogle();
        clearSessionData();
        navigate("/");
      } else {
        console.error("Error al cerrar la sesión");
      }
    } catch (error) {
      console.error("Error al cerrar la sesión:", error);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;
