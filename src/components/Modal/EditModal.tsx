import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import useModal from "../../hooks/useModal";
import { colorChartState, IToDo, IToDoState, toDoState } from "../../stores";
import SaveButton from "../Button/SaveButton";
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import DraggableCard from "../DraggableCard";
import { CONSTANT } from "../../helpers/constant";
import EmptyMessage from "../EmptyMessage";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 30px 0 0;

  & > div.divider {
    background-color: ${(prop) => prop.theme.form.label};
    width: 100%;
    height: 1px;
  }

  .input {
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

  input[type="text"] {
    background-color: transparent;
    border: none;
    padding: 10px;
    font-size: 16px;
    color: ${(prop) => prop.theme.form.label};
    outline: none;
  }

  input[type="text"]:hover,
  input[type="text"]:focus {
    background-color: ${(prop) => prop.theme.form.inputBgHover};
  }
`;

const ColorChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const ColorChip = styled.input<{ bgColor: string }>`
  vertical-align: middle;
  appearance: none;
  outline: none;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 4px solid ${(prop) => prop.theme.textColor};
  cursor: pointer;
  margin: 0;

  &:checked {
    border-color: ${(prop) => prop.theme.blue};
  }

  &:hover,
  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted ${(prop) => prop.theme.blue};
  }
`;

const CardListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  selectedBoardId?: string;
}

interface IFormInput extends Omit<IToDoState, "id"> {
  boardId: string;
}

export default function EditModal({ selectedBoardId }: Props) {
  const isUpdateMode = !!selectedBoardId;
  const { setModal } = useModal();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [colorChart, setColorChart] = useRecoilState(colorChartState);
  const { register, getValues, setValue, handleSubmit } = useForm<IFormInput>({
    defaultValues: isUpdateMode
      ? {
          boardId: selectedBoardId,
          backgroundColor:
            toDos.find((toDo) => toDo.id === selectedBoardId)
              ?.backgroundColor || colorChart[0],
          list: toDos.find((toDo) => toDo.id === selectedBoardId)?.list || [],
        }
      : { boardId: "", backgroundColor: colorChart[0], list: [] },
  });

  const onSubmit = ({ boardId, ...rest }: IFormInput) => {
    if (!!selectedBoardId) {
      setToDos((prevToDos) =>
        prevToDos.map((toDo) =>
          toDo.id === selectedBoardId ? { id: boardId, ...rest } : toDo,
        ),
      );
    } else {
      setToDos((prevToDos) => [...prevToDos, { id: boardId, ...rest }]);
    }

    setModal(null);
  };

  const onDragStart = ({ source }: DragStart) => {};
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const cardList = [...getValues("list")];
    const targetCard = cardList[source.index];
    cardList.splice(source.index, 1);
    cardList.splice(destination.index, 0, targetCard);
    setValue("list", cardList);
  };

  return (
    <>
      <h1>{isUpdateMode ? "보드 편집하기" : "보드 추가하기"}</h1>
      <EditForm onSubmit={handleSubmit(onSubmit)}>
        <div className={"input"}>
          <label htmlFor={"boardId"}>보드 이름</label>
          <input
            id={"boardId"}
            type={"text"}
            {...register("boardId", { required: true })}
          />
        </div>
        <div className={"input"}>
          <label htmlFor={"backgroundColor"}>보드 색상</label>
          <ColorChipContainer>
            {colorChart.map((color) => (
              <ColorChip
                id={`backgroundColor_${color}`}
                type={"radio"}
                value={color}
                bgColor={color}
                key={color}
                {...register("backgroundColor", { required: true })}
                name={"backgroundColor"}
              />
            ))}
          </ColorChipContainer>
        </div>
        <div className={"divider"} />
        {getValues("list").length === 0 ? (
          <EmptyMessage label={"카드"} />
        ) : (
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId={"card"}>
              {(provided, snapshot) => (
                <CardListContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {getValues("list").map((toDo, idx) => {
                    return (
                      <DraggableCard
                        key={toDo.id}
                        idx={idx}
                        toDoId={toDo.id}
                        toDoText={toDo.text}
                        backgroundColor={getValues("backgroundColor")}
                      />
                    );
                  })}
                  {provided.placeholder}
                </CardListContainer>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <SaveButton type="submit">저장</SaveButton>
      </EditForm>
    </>
  );
}
