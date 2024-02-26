import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import Button from "./Button/Button";
import useModal from "../hooks/useModal";

const ModalContainer = styled.dialog`
  background-color: ${(prop) => prop.theme.modal.bgColor};
  border: none;
  border-radius: 5px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  width: 80%;
  min-width: 500px;
  max-height: 100%;
  padding: 0;

  display: flex;
  flex-direction: column;

  & > header {
    padding: 20px 20px 10px;
  }

  & > div {
    padding: 20px 50px 30px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  & > div > h1 {
    font-weight: bold;
    font-size: 24px;
    color: ${(prop) => prop.theme.textColor};
  }
`;

const CloseButton = styled(Button)`
  border: none;
  font-size: 16px;
  color: ${(prop) => prop.theme.textColor};

  &:hover {
    color: ${(prop) => prop.theme.blue};
  }
`;

interface Props {
  content: ReactNode;
}

const Modal = forwardRef(function Modal({ content }: Props) {
  const { setModal } = useModal();
  return (
    <ModalContainer>
      <header>
        <CloseButton onClick={() => setModal(null)}>X</CloseButton>
      </header>
      <div>{content}</div>
    </ModalContainer>
  );
});
export default Modal;
