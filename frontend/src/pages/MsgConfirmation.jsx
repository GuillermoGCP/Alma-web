import React from "react";
import "./MsgConfirmation.css";

const Confirmation = () => {
  return (
    <div className="confirmation-page">
      <h1 className="confirmation-title">¡Mensaje enviado correctamente!</h1>
      <p className="confirmation-text">
        Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en
        contacto contigo lo antes posible.
      </p>
      <button
        className="confirmation-button"
        onClick={() => (window.location.href = "/")}
      >
        Volver a la página principal
      </button>
    </div>
  );
};

export default Confirmation;
