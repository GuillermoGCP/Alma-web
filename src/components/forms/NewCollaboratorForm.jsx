import React, { useState } from "react";
import { toast } from "react-toastify";
import useSubmitPartnerForm from "../../hooks/useSubmitPartnerForm";
import "./NewCollaboratorForm.css";

const NewPartnerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const { submitForm, isLoading } = useSubmitPartnerForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, surname, email, phone } = formData;

    const dataToSend = {
      name,
      surname,
      email,
      ...(phone?.trim() && { phone: phone.trim() }), // Agregamos el campo 'phone' solo si tiene valor
    };

    try {
      const data = await submitForm(dataToSend);

      if (data.error && data.error.includes("Ya existe un email")) {
        toast.error("El correo electrónico ya está registrado.");
      } else {
        toast.success("Socio añadido correctamente");
      }
    } catch (error) {
      toast.error(`Error al añadir socio: ${error.message || "Desconocido"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="contenedor-formulario">
        <div className="contenedor-campos-form">
          <label htmlFor="name" className="etiquetas-form-inscripcion">
            Nombre:
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="inputs-form-inscripcion"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="surname" className="etiquetas-form-inscripcion">
            Apellidos:
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="inputs-form-inscripcion"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="email" className="etiquetas-form-inscripcion">
            Correo electrónico:
            <span className="required">*</span>
          </label>

          <input
            type="email"
            id="collaborator-email"
            name="email"
            className="inputs-form-inscripcion"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="phone" className="etiquetas-form-inscripcion">
            Teléfono (opcional):
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="inputs-form-inscripcion"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d*"
            placeholder="Introduce solo números"
          />
        </div>
      </div>
      <div>
        <p className="texto-inscripcion-socios-destacada">
          La cuota anual es de 20€*
        </p>
        <p className="texto-inscripcion-socios">
          Puedes realizar la transferencia directamente a este número de cuenta:
        </p>
        <p className="texto-inscripcion-socios-destacada">
          {" "}
          IBAN: ES31 2095 5587 4091 1403 9324 (Kutxabank).
        </p>
      </div>
      <button className="boton-inscribirme" type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Inscribirme"}
      </button>
    </form>
  );
};
export default NewPartnerForm;
