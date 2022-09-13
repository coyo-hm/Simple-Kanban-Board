import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DragStart,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "../atoms";
import styled from "styled-components";
import { CONSTANT } from "../helpers/constant";
import { Container, Boards, BoardContainer } from "../style";
import DraggableBoard from "./DraggableBoard";
import IconPlusWhite from "../images/Icon_plus_white.png";
import IconPlusSkyblue from "../images/Icon_plus_skyblue.png";
import IconBinClosed from "../images/Icon_bin_closed.png";
import IconBinOpened from "../images/Icon_bin_opened.png";

const CreateBoard = styled.form`
  width: 100%;
  text-align: center;

  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    outline: none;
  }

  button {
    background: url(${IconPlusWhite}) no-repeat center/50px;
    width: 50px;
    height: 50px;
    border: none;

    &:hover {
      background: url(${IconPlusSkyblue}) no-repeat center/50px;
    }
  }
`;

const DeleteBtn = styled.button`
  background: url(${IconBinClosed}) no-repeat center/50px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: none;
  position: absolute;
  bottom: calc(50% - 250px);
  left: calc(50% - 25px);

  &:hover {
    background: #181a1d url(${IconBinOpened}) no-repeat center/50px;
  }
`;

interface IForm {
  boardId: string;
}

function DroppableArea() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [isBoardDropDisabled, setIsBoardDropDisabled] = useState(false);
  const [isCardDropDisabled, setIsCardDropDisabled] = useState(false);

  useEffect(() => {
    let savedTodo: IToDoState[] = JSON.parse(
      sessionStorage.getItem("TODOS") || "[]"
    );
    setToDos(savedTodo);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("TODOS", JSON.stringify(toDos));
  }, [toDos]);

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
            (board) => board.id === source.droppableId
          );
          if (!boardCopy?.list) return allBoards;
          const cardList = [...boardCopy?.list];

          const targetCard = cardList[source.index];
          cardList.splice(source.index, 1);
          cardList.splice(destination?.index, 0, targetCard);

          const newBoards = allBoards.map((board) =>
            board.id === source.droppableId
              ? { id: source.droppableId, list: cardList }
              : board
          );
          return newBoards;
        });
      } else if (destination.droppableId !== source.droppableId) {
        //보드를 건너서 움직일때
        setToDos((allBoards) => {
          const sourceBoard = allBoards.find(
            (board) => board.id === source.droppableId
          );
          const destinationBoard = allBoards.find(
            (board) => board.id === destination.droppableId
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
                id: board.id,
                list: newSourceBoard,
              };
            } else if (board.id === destination.droppableId) {
              return {
                id: board.id,
                list: newDestinationBoard,
              };
            } else return board;
          });

          return newBoards;
        });
      }
    }
  };

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
  };

  const deleteCard = (boardId: string, cardId: number) => {
    setToDos((allBoards) => {
      const targetBoard = allBoards.find((board) => board.id === boardId);
      if (!targetBoard?.list) return allBoards;
      const newList = [...targetBoard?.list];
      newList.splice(cardId, 1);
      const newBoards = allBoards.map((board) =>
        board.id === boardId ? { id: boardId, list: newList } : board
      );
      return newBoards;
    });
  };

  const deleteBoard = (boardId: string) => {
    setToDos((allBoards) => allBoards.filter((board) => board.id !== boardId));
  };

  const onDragStart = ({ source }: DragStart) => {
    setIsBoardDropDisabled(source.droppableId !== CONSTANT.DROP_TYPE.BOARD);
    setIsCardDropDisabled(source.droppableId === CONSTANT.DROP_TYPE.BOARD);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Container>
        <Droppable
          droppableId={CONSTANT.DROP_TYPE.BOARD}
          isDropDisabled={isBoardDropDisabled}
          direction={"horizontal"}
        >
          {(provided) => (
            <Boards {...provided.droppableProps} ref={provided.innerRef}>
              <BoardContainer>
                <CreateBoard onSubmit={handleSubmit(createBoard)}>
                  <input {...register("boardId", { required: true })} />
                  <button type="submit" />
                </CreateBoard>
              </BoardContainer>
              {toDos.map((board, idx) => (
                <DraggableBoard
                  idx={idx}
                  key={board.id}
                  board={board}
                  dropDisable={isCardDropDisabled}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
        <Droppable droppableId={CONSTANT.DROP_TYPE.DELETE}>
          {(provided) => (
            <DeleteBtn {...provided.droppableProps} ref={provided.innerRef} />
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

export default DroppableArea;
