import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import logo from "../images/logo-alma.png";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="image-container" onClick={() => navigate('/')}>
                <img
                    src={logo}
                    alt="Página No Encontrada"
                    className="not-found-image"
                />
            </div>
            <h1 className="not-found-title">¡Oops! Página No Encontrada</h1>
            <p className="not-found-text">
                Lo siento, la página que estás buscando no existe.
            </p>
            <button className="back-home-button" onClick={() => navigate('/')}>
                Volver al Inicio
            </button>
        </div>
    );
}

export default NotFoundPage;
