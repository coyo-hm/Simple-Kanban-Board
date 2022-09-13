import { Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
import { BoardContainer } from "../style";
import DraggableCard from "./DraggableCard";

const Title = styled.h1`
  text-align: center;
  margin-bottom: 15px;
  font-weight: 700;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#95afc0"
      : props.isDraggingFromThis
      ? "#f9ca24"
      : ""};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
    border: none;
    padding: 10px;
    outline: none;
  }

  button {
  }
`;

interface IBoardProps {
  board: IToDoState;
  idx: number;
  dropDisable: boolean;
}

interface IForm {
  toDo: string;
}

function DraggableBoard({ board, idx, dropDisable }: IBoardProps) {
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
          ? { id: board.id, list: [...todo.list, newTodo] }
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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{board.id}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type={"text"}
              placeholder={`Add task on ${board.id}`}
            />
          </Form>
          <Droppable droppableId={board.id} isDropDisabled={dropDisable}>
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
                    />
                  );
                })}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </BoardContainer>
      )}
    </Draggable>
  );
}

export default DraggableBoard;
