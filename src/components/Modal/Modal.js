import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

export default function Modal({ children, onCloseModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.querySelector('html').setAttribute('style', 'overflow: hidden');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.querySelector('html').removeAttribute('style');
    };
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="Modal__backdrop" onClick={handleBackdropClick}>
      <div className="Modal__content">{children}</div>
    </div>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
