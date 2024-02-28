import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { ReactComponent as IconEdit } from "../../images/Icon_edit.svg";
import useModal from "../../hooks/useModal";
import EditModal from "../Modal/EditModal";

const Container = styled(Button)<{ backgroundColor: string }>`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${(prop) => prop.backgroundColor};
  border: 1px solid ${(prop) => prop.backgroundColor};

  &:hover {
    color: ${(prop) => prop.theme.blue};
    border-color: ${(prop) => prop.theme.blue};
  }
`;

interface Props {
  boardId: string;
  backgroundColor: string;
}

export default function EditButton({ boardId, backgroundColor }: Props) {
  const { setModal } = useModal();

  const openUpdateModal = () => {
    setModal(<EditModal selectedBoardId={boardId} />);
  };
  return (
    <Container onClick={openUpdateModal} backgroundColor={backgroundColor}>
      <IconEdit width={24} height={24} strokeWidth={1.5} />
    </Container>
  );
}
