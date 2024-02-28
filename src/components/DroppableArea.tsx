import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "../stores";
import { CONSTANT } from "../helpers/constant";
import DraggableBoard from "./DraggableBoard";
import DroppableAreaContainer from "./DroppableAreaContainer";
import DeleteButton from "./Button/DeleteButton";
import EmptyMessage from "./EmptyMessage";
import BoardListContainer from "./BoardListContainer";

interface IForm {
  boardId: string;
}

export default function DroppableArea() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [isBoardDropDisabled, setIsBoardDropDisabled] = useState(false);
  const [isCardDropDisabled, setIsCardDropDisabled] = useState(false);

  useEffect(() => {
    let savedTodo: IToDoState[] = JSON.parse(
      localStorage.getItem("TODOS") || "[]",
    );
    setToDos(savedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(toDos));
  }, [toDos]);

  const deleteCard = (boardId: string, cardId: number) => {
    setToDos((allBoards) => {
      const targetBoard = allBoards.find((board) => board.id === boardId);
      if (!targetBoard?.list) return allBoards;
      const newList = [...targetBoard?.list];
      newList.splice(cardId, 1);
      const newBoards = allBoards.map((board) =>
        board.id === boardId ? { ...targetBoard, list: newList } : board,
      );
      return newBoards;
    });
  };

  const deleteBoard = (boardId: string) => {
    setToDos((allBoards) => allBoards.filter((board) => board.id !== boardId));
  };
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source, type } = info;
    if (!destination) return;

    if (destination.droppableId === CONSTANT.DROP_TYPE.DELETE) {
      return source.droppableId !== CONSTANT.DROP_TYPE.BOARD
        ? deleteCard(source.droppableId, source.index)
        : deleteBoard(draggableId);
    } else if (destination.droppableId === CONSTANT.DROP_TYPE.BOARD) {
      setToDos((allBoards) => {
        const newBoard = [...allBoards];
        const targetBoard = allBoards[source.index];

        newBoard.splice(source.index, 1);
        newBoard.splice(destination?.index, 0, targetBoard);

        return newBoard;
      });
    } else if (destination.droppableId !== CONSTANT.DROP_TYPE.BOARD) {
      if (destination?.droppableId === source.droppableId) {
        //같은 보드 내에서 움직일때
        setToDos((allBoards) => {
          const boardCopy = allBoards.find(
            (board) => board.id === source.droppableId,
          );
          if (!boardCopy?.list) return allBoards;
          const cardList = [...boardCopy?.list];

          const targetCard = cardList[source.index];
          cardList.splice(source.index, 1);
          cardList.splice(destination?.index, 0, targetCard);

          const newBoards = allBoards.map((board) =>
            board.id === source.droppableId
              ? { ...boardCopy, list: cardList }
              : board,
          );
          return newBoards;
        });
      } else if (destination.droppableId !== source.droppableId) {
        //보드를 건너서 움직일때
        setToDos((allBoards) => {
          const sourceBoard = allBoards.find(
            (board) => board.id === source.droppableId,
          );
          const destinationBoard = allBoards.find(
            (board) => board.id === destination.droppableId,
          );
          if (!sourceBoard?.list || !destinationBoard?.list) return allBoards;

          const targetCard = sourceBoard.list[source.index];
          const newSourceBoard = [...sourceBoard.list];
          const newDestinationBoard = [...destinationBoard.list];
          newSourceBoard.splice(source.index, 1);
          newDestinationBoard.splice(destination?.index, 0, targetCard);

          const newBoards = allBoards.map((board) => {
            if (board.id === source.droppableId) {
              return {
                ...sourceBoard,
                list: newSourceBoard,
              };
            } else if (board.id === destination.droppableId) {
              return {
                ...destinationBoard,
                list: newDestinationBoard,
              };
            } else return board;
          });

          return newBoards;
        });
      }
    }
  };
  const onDragStart = ({ source }: DragStart) => {
    setIsBoardDropDisabled(source.droppableId !== CONSTANT.DROP_TYPE.BOARD);
    setIsCardDropDisabled(source.droppableId === CONSTANT.DROP_TYPE.BOARD);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <DroppableAreaContainer>
        {toDos.length === 0 && <EmptyMessage />}
        <Droppable
          droppableId={CONSTANT.DROP_TYPE.BOARD}
          isDropDisabled={isBoardDropDisabled}
          direction={"horizontal"}
        >
          {(provided) => (
            <BoardListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {toDos.map((board, idx) => (
                <DraggableBoard
                  idx={idx}
                  key={board.id}
                  board={board}
                  dropDisable={isCardDropDisabled}
                />
              ))}
              {provided.placeholder}
            </BoardListContainer>
          )}
        </Droppable>
        <Droppable droppableId={CONSTANT.DROP_TYPE.DELETE}>
          {(provided) => (
            <DeleteButton
              {...provided.droppableProps}
              ref={provided.innerRef}
            />
          )}
        </Droppable>
      </DroppableAreaContainer>
    </DragDropContext>
  );
}
