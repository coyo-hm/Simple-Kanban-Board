import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style";

interface IDraggableCardProps {
  idx: number;
  toDoId: number;
  toDoText: string;
}

function DraggableCard({ idx, toDoId, toDoText }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
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
