import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./AdminGeneral.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminGeneral = () => {
  const [settings, setSettings] = useState({
    logo: "",
    linkInstagram: "",
    linkFacebook: "",
    email: "",
  });
  const [file, setFile] = useState(null);

  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Fetch de los datos actuales
  useEffect(() => {
    fetch(`${API_BASE_URL}/get-home-data`)
      .then((response) => response.json())
      .then((data) => {
        const { generalSettings } = data.form;
        setSettings(generalSettings);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateAndUpdateField = async (fieldName, value) => {
    if (fieldName !== "logo" && !value) {
      notify("error", `El campo de ${fieldName} no puede estar vacío`);
      return;
    }

    try {
      if (fieldName === "logo" && file) {
        const formData = new FormData();
        formData.append("logo", file);

        const response = await fetch(`${API_BASE_URL}/update-home-data`, {
          method: "PATCH",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error uploading file");
        }

        const result = await response.json();
        const { generalSettings } = result.data;
        setSettings(generalSettings);
        notify("success", "Logotipo actualizado correctamente");
      } else {
        const updateData = {
          generalSettings: {
            [fieldName]: value,
          },
        };

        const response = await fetch(`${API_BASE_URL}/update-home-data`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error(`Error updating ${fieldName}`);
        }

        notify("success", `${fieldName} actualizado correctamente`);
      }
    } catch (error) {
      notify("error", `Error al actualizar ${fieldName}: ${error.message}`);
    }
  };

  return (
    <main className="settings-content-general">
      <div className="logo-section">
        <h3>Logotipo</h3>
        <img
          src={file ? URL.createObjectURL(file) : `${settings?.logo}`}
          alt="Logo"
          className="logo-image"
        />
        <div className="logo-buttons">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="actualizar-logo-boton">
          <button onClick={() => validateAndUpdateField("logo", file)}>
            <FontAwesomeIcon icon={faUpload} /> Actualizar Logotipo
          </button>
        </div>
      </div>

      <form className="social-links-form">
        <label>
          Link de Instagram
          <input
            type="text"
            name="linkInstagram"
            placeholder="Nueva dirección de Instagram"
            value={settings.linkInstagram || ""}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() =>
              validateAndUpdateField("linkInstagram", settings.linkInstagram)
            }
          >
            <i className="fab fa-instagram"></i> Actualizar Instagram
          </button>
        </label>

        <label>
          Link de Facebook
          <input
            type="text"
            name="linkFacebook"
            placeholder="Nueva dirección de Facebook"
            value={settings.linkFacebook || ""}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() =>
              validateAndUpdateField("linkFacebook", settings.linkFacebook)
            }
          >
            <i className="fab fa-facebook"></i> Actualizar Facebook
          </button>
        </label>

        <label>
          Correo Electrónico
          <input
            type="email"
            name="email"
            placeholder="Nueva dirección de correo electrónico"
            value={settings.email || ""}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => validateAndUpdateField("email", settings.email)}
          >
            <i className="fas fa-envelope"></i> Actualizar Correo
          </button>
        </label>
      </form>
    </main>
  );
};

export default AdminGeneral;
