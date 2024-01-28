import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import styled from "styled-components";

const Dim = styled.div`
  position: fixed;
  background-color: rgba(15, 15, 15, 0.8);
  inset: 0;
`;

const ModalContainer = styled.dialog``;

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
          <ModalContainer>{modal}</ModalContainer>
          <Dim />
        </>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
