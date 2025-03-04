import React from "react";
import useLanguage from "../hooks/useLanguage";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("es")}
        className={currentLanguage === "es" ? "active" : ""}
      >
        ESP
      </button>
      <button
        onClick={() => changeLanguage("gl")}
        className={currentLanguage === "gl" ? "active" : ""}
      >
        GAL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
