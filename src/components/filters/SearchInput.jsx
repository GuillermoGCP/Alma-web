import { useState } from 'react'

export function SearchInput({setStatus, eventType, options, text, defaultLabel, onChange}) {
    const handleClick = () => {
     // Vacía, por si necesitamos añadirla
    }


function handleChange(e) {
  const { name, value } = e.target;
  setStatus(value);
  if (onChange) {
    onChange(e);
    console.log(name);
  }
}

  return (
    <div className="filter filter-type">
      <label htmlFor={eventType}>{text}</label>
       <input
        type="text"
        className="select-input"
        placeholder="Todas las localidades"
        name={eventType}
        id={eventType}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}  