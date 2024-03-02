import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { IToDoState, toDoState } from "../stores";
import { CardForm } from "../types/card";
import DraggableCard from "./DraggableCard";
import BoardContainer, { CardListContainer } from "./BoardContainer";
import EditButton from "./Button/EditButton";
import Input from "./Input";

interface IBoardProps {
  board: IToDoState;
  idx: number;
  dropDisable: boolean;
}

export default function DraggableBoard({
  board,
  idx,
  dropDisable,
}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<CardForm>();
  const onSubmit = ({ toDo }: CardForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) =>
      allBoards.map((todo) =>
        todo.id === board.id
          ? { ...board, list: [...todo.list, newTodo] }
          : todo,
      ),
    );
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("toDo", { required: true })}
              type={"text"}
              placeholder={`카드 추가하기`}
            />
          </form>
          <Droppable droppableId={board.id} isDropDisabled={dropDisable}>
            {(provided, snapshot) => (
              <CardListContainer
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                backgroundColor={board.backgroundColor}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {board.list.map((toDo, idx) => (
                  <DraggableCard
                    key={toDo.id}
                    idx={idx}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    backgroundColor={board.backgroundColor}
                  />
                ))}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
        </BoardContainer>
      )}
    </Draggable>
  );
}
