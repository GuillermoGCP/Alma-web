import useFormBuilder from "../hooks/useFormBuilder";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./FormBuilder.css";

const FormBuilder = ({ setForms }) => {
  const { onSubmit, register, handleSubmit, fields, append, remove } =
    useFormBuilder(setForms);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Alternar el estado del modal
  };

  return (
    <div className="contenedor-creador-formularios">
      <h3>1. Escribe el nombre del formulario</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contenedor-input-creador-formularios">
          <input
            className="input-creador-formularios"
            {...register("formName", { required: true })}
            placeholder="Nombre del Formulario"
          />
        </div>

        <div>
          {fields.map((item, index) => (
            <div
              className="contenedor-añadir-campo"
              key={index}
              style={{ marginBottom: "20px" }}
            >
              <h3>
                2.1. Escoge que tipo de campo quieres:
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  onClick={toggleModal}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </h3>

              <select
                className="select-creador-formularios"
                {...register(`fields.${index}.type`)}
              >
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="email">Email</option>
                {/* <option value="password">Contraseña</option> */}
              </select>
              <h3>2.2 Escribe el contenido del campo</h3>

              <input
                className="input-creador-formularios"
                {...register(`fields.${index}.label`)}
                placeholder="Etiqueta del Campo"
                style={{ marginRight: "10px" }}
              />

              <button
                className="boton-eliminar-campo-formulario "
                type="button"
                onClick={() => remove(index)}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar campo
              </button>
            </div>
          ))}
        </div>

        {/* Modal de información */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div
              className="modal-contenido"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Información de los campos</h3>
              <p className="texto-descriptivo-accion-modal">
                <strong>Texto: </strong>Cualquier tipo de texto corto, como
                nombres o direcciones. Ejemplo: "Campo: Texto → Contenido:
                Nombre". <br />
                <strong>Número: </strong>Solo permite ingresar números. Ejemplo:
                "Campo: Número → Contenido: Edad". <br />
                <strong>Email: </strong>Valida que el valor sea un correo
                electrónico. Ejemplo: "Campo: Email → Contenido: Correo
                electrónico". <br />
              </p>
              <button onClick={toggleModal}>Cerrar</button>
            </div>
          </div>
        )}

        <div className="contenedor-botones-añadir-generar-form">
          <h3>2. Añade todos los campos necesarios:</h3>

          <button
            className="boton-añadir-campo-formulario"
            type="button"
            onClick={() => append({ label: "", type: "text" })}
          >
            <FontAwesomeIcon icon={faPlus} /> Añadir otro campo
          </button>
        </div>
        <div className="contenedor-botones-añadir-generar-form">
          <h3>
            3. Cuando tengas todos los campos, haz clic en 'Generar formulario':
          </h3>

          <button type="submit" className="boton-generar-formulario">
            <FontAwesomeIcon icon={faCheck} /> Generar formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
