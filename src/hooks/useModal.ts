import { ModalContext, ModalContextProps } from "../contexts/ModalContext";
import { useContext } from "react";

const useModal = () => {
  const modalProps = useContext(ModalContext);

  if (!modalProps) {
    throw new Error("NO CONTENT");
  }

  return modalProps;
};
export default useModal;
