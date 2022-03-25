import React from 'react';
import { CloseModalButton, CreateModal } from './style';

interface Props {
  show: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, toggleModal, children }: Props) => {
  if (!show) return null;
  return (
    <CreateModal onClick={toggleModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <CloseModalButton onClick={toggleModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
