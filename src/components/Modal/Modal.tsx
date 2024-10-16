import { useEffect } from 'react';
import './modal.scss'
import Footer from '../Footer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; 
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children, className = 'modal'  }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={className}>
        <div className={`${className}__content`} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Modal;