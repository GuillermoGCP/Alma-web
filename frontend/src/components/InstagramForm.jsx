import { useState } from "react";
import useInstagramForm from "../hooks/useInstagramForm";
import "./InstagramForm.css";
import "./private/Modals/InstagramTutorial.css";
import Modal from "../modal/ModalBooks";
import InstagramTutorial from "./private/Modals/InstagramTutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const InstagramForm = ({ setInstagramPost, setSelectedPostNumber }) => {
  const {
    blockquote,
    setBlockquote,
    postNumber,
    handlePostNumberChange,
    handleSubmit,
    handleDeletePost,
  } = useInstagramForm(setInstagramPost);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePostChange = (e) => {
    handlePostNumberChange(e);
    setSelectedPostNumber(e.target.value);
  };

  const displayInfo = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <>
      <form className="instagram-form-container" onSubmit={handleSubmit}>
        <div>
          <p className="texto-descriptivo-accion">
            Primero escoge una de las 6 secciones:
          </p>
        </div>
        <div className="instagram-form-input-select">
          <select
            className="instagram-form-select"
            name="postNumber"
            onChange={handlePostChange}
            value={postNumber}
            required
          >
            <option value="">Selecciona una sección</option>
            <option value="1">Sección 1</option>
            <option value="2">Sección 2</option>
            <option value="3">Sección 3</option>
            <option value="4">Sección 4</option>
            <option value="5">Sección 5</option>
            <option value="6">Sección 6</option>
          </select>
        </div>
        <div>
          <p className="texto-descriptivo-accion">
            Luego introduce el código de inserción y haz click en publicar
          </p>
        </div>
        <div className="instagram-form-input-select">
          <input
            className="instagram-form-input"
            type="text"
            required
            value={blockquote}
            onChange={(e) => setBlockquote(e.target.value)}
            placeholder="Introduce el código de inserción de Instagram"
          />
        </div>
        <div className="contenedor-info-popup-historico">
          <button onClick={displayInfo} className="help-btn-insta">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="info-icon-historico"
            />
            ¿Cómo obtener el código de inserción?
          </button>
        </div>
        <div className="instagram-form-buttons">
          <button className="instagram-form-button-submit" type="submit">
            <i className="fas fa-upload"></i> Publicar
          </button>
          <button
            className="instagram-form-button-delete"
            onClick={handleDeletePost}
          >
            <i className="fas fa-times"></i> Borrar
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <InstagramTutorial />
      </Modal>
    </>
  );
};

export default InstagramForm;
