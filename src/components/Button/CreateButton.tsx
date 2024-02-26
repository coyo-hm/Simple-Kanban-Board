import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState } from "../../atoms";
import useModal from "../../hooks/useModal";
import Button from "./Button";
import ToolbarButton from "./ToolbarButton";

const CreateForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 30px 0 0;

  & > div {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(50px, 20%) 1fr;
    gap: 5px 10px;
    align-items: center;
  }

  label {
    color: ${(prop) => prop.theme.form.label};
    padding: 0 10px 0 0;
    font-size: 16px;
  }

  input {
    background-color: transparent;
    border: none;
    padding: 10px;
    font-size: 16px;
    color: ${(prop) => prop.theme.form.label};
    outline: none;
  }

  input:hover,
  input:focus {
    background-color: ${(prop) => prop.theme.form.inputBgHover};
  }
`;

const SaveButton = styled(Button)`
  width: fit-content;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;

  &:hover {
    background-color: ${(prop) => prop.theme.blue};
    color: white;
    border-color: ${(prop) => prop.theme.blue};
  }
`;

interface IForm {
  boardId: string;
}

export default function CreateButton() {
  const { setModal } = useModal();
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const [toDos, setToDos] = useRecoilState(toDoState);

  const createBoard = ({ boardId }: IForm) => {
    setToDos((prevToDos) => {
      return [
        ...prevToDos,
        {
          id: boardId,
          list: [],
        },
      ];
    });
    setValue("boardId", "");
    setModal(null);
  };

  const openCreateModal = () => {
    setModal(
      <>
        <h1>보드 추가하기</h1>
        <CreateForm onSubmit={handleSubmit(createBoard)}>
          <div>
            <label htmlFor={"boardId"}>보드 이름</label>
            <input
              id={"boardId"}
              {...register("boardId", { required: true })}
            />
          </div>
          <SaveButton type="submit">저장</SaveButton>
        </CreateForm>
      </>,
    );
  };
  return (
    <ToolbarButton onClick={openCreateModal}>
      <span>+</span>보드 추가하기
    </ToolbarButton>
  );
}
