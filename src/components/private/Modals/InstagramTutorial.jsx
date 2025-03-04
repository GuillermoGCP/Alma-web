import React, { useEffect, useState } from "react";
import "./InstagramTutorial.css";

function InstagramTutorial() {
  const [slide, setSlide] = useState(0);

  const changeSlide = (operator) => {
    if (operator === "-" && slide > 0) {
      setSlide(slide - 1);
    } else if (operator === "+" && slide < slides.length - 1) {
      setSlide(slide + 1);
    }
  };

  const slides = [
    {
      src: "https://res.cloudinary.com/dqhemn1nv/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728548533/Alma_insta_1_xlu1yb.png",
      comment: "Selecciona una imagen de Instagram",
    },
    {
      src: "https://res.cloudinary.com/dqhemn1nv/image/upload/w_1000,ar_1:1,c_fill,g_east,e_art:hokusai/v1728548566/Screenshot_from_2024-10-10_10-07-39_o8cj3y.png",
      comment: "En la esquina superior derecha, haz click en los tres puntos",
    },
    {
      src: "https://res.cloudinary.com/dqhemn1nv/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728550298/Screenshot_from_2024-10-10_10-51-16_kc479q.png",
      comment: "Haz click en la opción INSERTAR",
    },
    {
      src: "https://res.cloudinary.com/dqhemn1nv/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728548561/Screenshot_from_2024-10-10_10-08-46_iyzizg.png",
      comment: "Copia el código que aparece, quitando la opción 'incluir pie de foto'",
    },
    {
      src: "https://res.cloudinary.com/dqhemn1nv/image/upload/v1728548553/Screenshot_from_2024-10-10_10-10-18_ig3ikx.png",
      comment: "Pega el código en este menú y haz click en publicar",
    },
    {
      comment:
        "Listo! Puedes comprobar en tu web la nueva actividad que has subido",
    },
  ];

  return (
    <div className="slideshow-modal">
      <button
        className="flechas-control-carrousel"
        onClick={() => changeSlide("-")}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div>
        <img className="modal-image-insta" src={slides[slide].src} alt="" />
        <p className="texto-descriptivo-accion">{`${slide + 1}. ${
          slides[slide].comment
        }`}</p>
      </div>
      <button
        className="flechas-control-carrousel"
        onClick={() => changeSlide("+")}
      >
        {" "}
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default InstagramTutorial;
