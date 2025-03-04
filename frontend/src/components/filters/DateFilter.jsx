import React from 'react';

function DateFilter({ label, date, setDate }) {
  const handleDateChange = (e) => {
    const desiredDate = e.target.value;
    const isoDate = `${desiredDate}T00:00:00`;
    setDate(e.target.value);
    console.log(e.target.value);
    
  };

  return (
    <div className="filter date-picker">
      <label>{label}</label>
      <input 
        className='select-input'
        type="date" 
        value={date} 
        onChange={handleDateChange} 
      />
    </div>
  );
};

export default DateFilter;