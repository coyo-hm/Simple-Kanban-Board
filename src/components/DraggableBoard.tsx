import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../stores";
import DraggableCard from "./DraggableCard";
import BoardContainer, { CardListContainer } from "./BoardContainer";
import EditButton from "./Button/EditButton";
import CreateCardForm from "./CreateCardForm";

interface IBoardProps {
  board: IToDoState;
  idx: number;
  dropDisable: boolean;
}

interface IForm {
  toDo: string;
}

export default function DraggableBoard({
  board,
  idx,
  dropDisable,
}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      let newBoard = allBoards.map((todo) => {
        return todo.id === board.id
          ? { ...board, list: [...todo.list, newTodo] }
          : todo;
      });
      return newBoard;
    });
    setValue("toDo", "");
  };

  return (
    <Draggable draggableId={board.id} index={idx}>
      {(provided) => (
        <BoardContainer
          backgroundColor={board.backgroundColor}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header>
            <h1 className={"title"}>{board.id}</h1>
            <EditButton
              boardId={board.id}
              backgroundColor={board.backgroundColor}
            />
          </header>
          <CreateCardForm onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type={"text"}
              placeholder={`${board.id} 에 카드 추가하기`}
            />
          </CreateCardForm>
          <Droppable droppableId={board.id} isDropDisabled={dropDisable}>
            {(provided, snapshot) => (
              <CardListContainer
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                backgroundColor={board.backgroundColor}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {board.list.map((toDo, idx) => {
                  return (
                    <DraggableCard
                      key={toDo.id}
                      idx={idx}
                      toDoId={toDo.id}
                      toDoText={toDo.text}
                      backgroundColor={board.backgroundColor}
                    />
                  );
                })}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
        </BoardContainer>
      )}
    </Draggable>
  );
}
