import React, { useState } from "react";

export default function ErrorModal(props) {
  const [display, setDisplay] = useState("block");
  const error = props.error;
  const setError = props.setError;

  function closeModal() {
    setDisplay("none");
    setError({});
  }

  return (
    <div className="modal" onClick={closeModal} style={{ display: display }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <h2 className="modal-title error">Error</h2>
        <h4 className="modal-body">{error.message}</h4>
        <button onClick={closeModal}>Try Again</button>
      </div>
    </div>
  );
}
