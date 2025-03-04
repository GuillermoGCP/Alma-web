import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import "./AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";

const useDynamicTitle = () => {
  const location = useLocation();
  switch (location.pathname) {
    case "/dashboard/general":
      return "AJUSTES GENERALES";
    case "/dashboard/inicio":
      return "INICIO";
    case "/dashboard/quienes-somos":
      return "QUIÉNES SOMOS";
    case "/dashboard/actividades":
      return "PRÓXIMAS ACTIVIDADES";
    case "/dashboard/historico":
      return "HISTÓRICO";
    case "/dashboard/biblioteca":
      return "BIBLIOTECA";
    case "/dashboard/CreadorFormularios":
      return "FORMULARIOS";
    default:
      return "AJUSTES GENERALES";
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual
  const activeTab = useDynamicTitle();

  const handleTabChange = (path) => {
    navigate(`/dashboard/${path}`);
  };

  const isActive = (path) => location.pathname === `/dashboard/${path}`; // Función para verificar la ruta activa

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <div className="admin-header">
          <button
            className="home-button"
            onClick={() => handleTabChange("general")}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
          <h1>PANEL DE ADMINISTRACIÓN - {activeTab}</h1>
        </div>
        <div className="contenedor-lista-dashboard">
          <ul>
            <li>
              <button
                className={`sidebar-btn ${isActive("general") ? "active" : ""}`} // Clase activa
                onClick={() => handleTabChange("general")}
              >
                AJUSTES GENERALES
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${isActive("inicio") ? "active" : ""}`} // Clase activa
                onClick={() => handleTabChange("inicio")}
              >
                INICIO
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${
                  isActive("quienes-somos") ? "active" : ""
                }`} // Clase activa
                onClick={() => handleTabChange("quienes-somos")}
              >
                QUIÉNES SOMOS
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${
                  isActive("actividades") ? "active" : ""
                }`} // Clase activa
                onClick={() => handleTabChange("actividades")}
              >
                PRÓXIMAS ACTIVIDADES
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${
                  isActive("historico") ? "active" : ""
                }`} // Clase activa
                onClick={() => handleTabChange("historico")}
              >
                HISTÓRICO
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${
                  isActive("biblioteca") ? "active" : ""
                }`} // Clase activa
                onClick={() => handleTabChange("biblioteca")}
              >
                BIBLIOTECA
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${
                  isActive("CreadorFormularios") ? "active" : ""
                }`} // Clase activa
                onClick={() => handleTabChange("CreadorFormularios")}
              >
                FORMULARIOS
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-dashboard">
          <LogoutButton>
            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
          </LogoutButton>
          <a href="/" className="back-to-site-link">
            Volver al sitio web de Alma Lactancia
          </a>
        </div>
      </aside>
    </div>
  );
};

export default AdminDashboard;
