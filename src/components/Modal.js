import React from "react";
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, title, children, category, level }) => {
  if (!isOpen) return null;

  let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
  let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');

  return (
    <div className="modal-backdrop">
      <div className={`modal-container ${bodyBckgroundClass}`}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <h5>{category.toUpperCase()} - {level.toUpperCase()}</h5>
        <h2 id="top10">TOP10</h2>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className={btnBckgroundClass} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
