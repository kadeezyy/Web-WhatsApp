import React from 'react';
import "./ErrorModal.scss"
const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Error</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;