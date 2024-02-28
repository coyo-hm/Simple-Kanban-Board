import React from "react";
import useModal from "../../hooks/useModal";
import ToolbarButton from "./ToolbarButton";
import EditModal from "../Modal/EditModal";

export default function CreateButton() {
  const { setModal } = useModal();

  const openCreateModal = () => {
    setModal(<EditModal />);
  };
  return (
    <ToolbarButton onClick={openCreateModal}>
      <span>+</span>보드 추가하기
    </ToolbarButton>
  );
}
