import React, { useState } from "react";
import "./MembershipModal.css";

const MembershipModal = ({ isOpen, onClose, onVerify }) => {
  const [membershipID, setMembershipID] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (!membershipID.trim() || !email.trim()) {
      setErrorMessage(
        "Por favor, introduce tu ID de socio y tu correo electrónico."
      );
      return;
    }

    try {
      const response = await fetch(
        "https://alma-server-translatev-docker.onrender.com/check-access-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: membershipID, email: email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onVerify(); // Llamar a la función de verificación exitosa
        onClose(); // Cerrar el modal
      } else {
        setErrorMessage(
          data.message || "Datos incorrectos. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      setErrorMessage("Error al verificar. Inténtalo más tarde.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Acceso exclusivo para socios</h2>
        <p>
          Introduce tu ID de socio y tu correo para continuar con la
          inscripción:
        </p>
        <input
          type="text"
          value={membershipID}
          onChange={(e) => setMembershipID(e.target.value)}
          placeholder="ID de socio"
          className="input-id-socio"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="input-email-socio"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="modal-actions">
          <button onClick={handleVerify} className="confirm-verificar-btn">
            Verificar
          </button>
          <button onClick={onClose} className="cancel-delete-btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;
