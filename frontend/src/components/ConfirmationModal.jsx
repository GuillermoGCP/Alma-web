import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null; // No renderizar el modal si no está abierto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmación</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-delete-btn">Cancelar</button>
          <button onClick={onConfirm} className="confirm-delete-btn">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
