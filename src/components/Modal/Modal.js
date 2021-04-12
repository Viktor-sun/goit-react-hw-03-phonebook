import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.querySelector('html').setAttribute('style', 'overflow: hidden');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.querySelector('html').removeAttribute('style');
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      document.getElementById('modal-root'),
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
