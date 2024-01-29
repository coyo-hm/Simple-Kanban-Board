import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import styled from "styled-components";
import Modal from "../components/Modal";

const Dim = styled.div`
  position: fixed;
  background-color: ${(prop) => prop.theme.modal.dimColor};
  inset: 0;
`;

export interface ModalContextProps {
  setModal: Dispatch<SetStateAction<ReactNode>>;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

interface Props {
  children: ReactNode;
}
const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<ReactNode>(null);
  return (
    <ModalContext.Provider value={{ setModal }}>
      {children}
      {!!modal && (
        <>
          <Dim />
          <Modal content={modal} />
        </>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
