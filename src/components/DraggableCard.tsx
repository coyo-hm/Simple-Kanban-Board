import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{
  isDragging: boolean;
  backgroundColor: string;
}>`
  background-color: ${(props) =>
    props.isDragging
      ? props.backgroundColor
      : props.theme.key === "dark"
        ? props.backgroundColor + "33"
        : "rgba(247,247,245,255)"};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  padding: 10px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};

  &:last-child {
    margin: 0;
  }
`;

interface IDraggableCardProps {
  idx: number;
  toDoId: number;
  toDoText: string;
  backgroundColor: string;
}

function DraggableCard({
  idx,
  toDoId,
  toDoText,
  backgroundColor,
}: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          backgroundColor={backgroundColor}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
