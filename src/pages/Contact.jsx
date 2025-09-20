import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Captcha from "../components/Captcha";
import silueta from "../images/IlustracionLactancia.png";
import useContactInfo from "../hooks/useContactInfo.js";
import { toast } from "react-toastify"; // Import toast if missing
import "./Contact.css";

const Contact = () => {
  const { generalSettings } = useContactInfo();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.name.trim()) {
      isValid = false;
    }

    if (!formData.surname.trim()) {
      isValid = false;
    }

    if (!formData.email.trim()) {
      isValid = false;
    }

    if (!formData.subject.trim()) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    // Validate form before sending data
    if (!validateForm()) {
      return; // Prevent further actions if validation fails
    }

    try {
      // Proceed with form submission if validation passes
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/new-contact-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      toast.dismiss();
      toast.success("Mensaje enviado correctamente");
      setFormData({
        name: "",
        surname: "",
        email: "",
        subject: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error en el formulario");
    }
  };

  const instagramLink = generalSettings?.linkInstagram || "";
  const facebookLink = generalSettings?.linkFacebook || "";
  const email = generalSettings?.email || "";

  return (
    <div className="contact-page">
      <main className="contact-main">
        <h1 className="contact-title">Contacto</h1>
        <div className="contact-content">
          <form id="contact">
            <div className="name-fields">
              <div className="name-field">
                <label htmlFor="name" className="etiquetas-contacto">
                  Nombre completo
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="inputs-contacto"
                  required
                />
              </div>

              <div className="name-field">
                <label htmlFor="surname" className="etiquetas-contacto">
                  Apellido completo
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="inputs-contacto"
                  required
                />
              </div>
            </div>

            <label htmlFor="email" className="etiquetas-contacto">
              Correo electrónico
              <span className="required">*</span>
            </label>
            <input
              type="email"
              className="inputs-contacto"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject" className="etiquetas-contacto">
              Asunto<span className="required">*</span>
            </label>
            <input
              type="text"
              className="inputs-contacto"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="comments" className="etiquetas-contacto">
              Mensaje
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="area-texto-contacto"
            ></textarea>

            <Captcha
              handleSubmit={handleSubmit}
              captchaInputClassName={"captcha-input"}
              buttonClassName={"contact-button"}
              validateForm={validateForm}
            />
          </form>

          <div className="contact-info">
            <p className="texto-redes-contacto">
              También podéis contactar con la Asociación ALMA a través de
              cualquiera de los siguientes medios:
            </p>
            <p>
              <a
                href={email ? `mailto:${email}` : undefined}
                className="contact-info-icon"
              >
                <i className="fas fa-envelope"></i> {email}
              </a>
            </p>
            <p>
              <a
                href={instagramLink}
                className="contact-info-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i> {instagramLink}
              </a>
            </p>
            <p>
              <a
                href={facebookLink}
                className="contact-info-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i> {facebookLink}
              </a>
            </p>
            <img src={silueta} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Contact;
