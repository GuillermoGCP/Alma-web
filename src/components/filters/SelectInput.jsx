import { useState } from 'react'

export function SelectInput({setStatus, eventType, options, text, defaultLabel, onChange}) {
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
      <select
        className="select-input"
        defaultValue=""
        onClick={handleClick}
        onChange={handleChange}
        name={eventType}
        id={eventType}
      >
        <option value="">{defaultLabel}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}  