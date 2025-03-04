import React from "react";
import "./CustomToolbar.css";

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const label = () => {
    const date = toolbar.date;
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  return (
    <div className="custom-toolbar">
      <span className="custom-toolbar-arrow" onClick={goToBack}>
        &lt;
      </span>
      <span className="custom-toolbar-label">{label()}</span>
      <span className="custom-toolbar-arrow" onClick={goToNext}>
        &gt;
      </span>
    </div>
  );
};

export default CustomToolbar;
