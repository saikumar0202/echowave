import React, { useEffect } from 'react';
import './CustomModal.scss';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseCallback?: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  overlayColor?: string;
  overlayClose?: boolean;
  closeButton?: boolean;
}

const Modal: React.FC<CustomModalProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   onCloseCallback,
                                                   title,
                                                   children,
                                                   size = 'medium',
                                                   overlayColor = 'rgba(0, 0, 0, 0.5)',
                                                   overlayClose = true,
                                                   closeButton = true,
                                                 }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  if (!isOpen) return null;

  const modalSizeClass = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large',
    fullscreen: 'modal-fullscreen',
  }[size];

  return (
    <div
      className="modal-overlay"
      style={{ backgroundColor: overlayColor }}
      onClick={overlayClose ? handleClose : undefined}
    >
      <div
        className={`modal-content ${modalSizeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <button className="modal-close-button" onClick={handleClose}>
            &times;
          </button>
        )}
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
