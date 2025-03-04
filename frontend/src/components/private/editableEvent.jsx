import React from "react";

function EditableEvent({ eventData, onClick }) {
  return (
    <>
      <li style={{ listStyle: "none" }}>
        <button className="list-btn" onClick={onClick}>
          {eventData.summary}
        </button>
      </li>
    </>
  );
}

export default EditableEvent;
