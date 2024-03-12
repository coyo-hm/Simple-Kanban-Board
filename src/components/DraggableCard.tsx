import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditButton from "./Button/EditButton";
import IconButton from "./Button/IconButton";

import { ReactComponent as IconCheck } from "../images/Icon_check.svg";

const Card = styled.div<{
  isDragging: boolean;
  backgroundColor: string;
  isEdit?: boolean;
}>`
  background-color: ${(props) =>
    props.isDragging
      ? props.backgroundColor
      : props.theme.key === "dark"
        ? props.backgroundColor + "33"
        : "rgba(247,247,245,255)"};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  display: flex;
  gap: 5px;
  align-items: center;
  outline: ${(props) =>
    props.isEdit ? `2px solid ${props.theme.blue}` : "none"};

  &:last-child {
    margin: 0;
  }

  & > input {
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
  }

  & > button {
    visibility: hidden;
  }

  &:hover > button {
    visibility: visible;
  }
`;

interface IDraggableCardProps {
  idx: number;
  toDoId: number;
  toDoText: string;
  backgroundColor: string;
  updateToDo?: (toDoId: number, toDoText: string) => void;
}

function DraggableCard({
  idx,
  toDoId,
  toDoText,
  backgroundColor,
  updateToDo,
}: IDraggableCardProps) {
  const [text, setText] = useState(toDoText);
  const [isEdit, setIsEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(toDoText);
  }, [toDoText]);

  const onClickEdit = () => {
    setIsEdit(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onClickSave = () => {
    setIsEdit(false);
    updateToDo && updateToDo(toDoId, text);
  };

  return (
    <Draggable draggableId={toDoId + ""} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          backgroundColor={backgroundColor}
          isEdit={isEdit}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            value={text}
            readOnly={!isEdit}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          />
          {isEdit ? (
            <IconButton
              backgroundColor={backgroundColor}
              onClick={() => onClickSave()}
            >
              <IconCheck width={24} height={24} strokeWidth={1.5} />
            </IconButton>
          ) : (
            <EditButton
              backgroundColor={backgroundColor}
              onClick={() => onClickEdit()}
            />
          )}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
