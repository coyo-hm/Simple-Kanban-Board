import styled from "styled-components";

const CardListContainer = styled.div<{
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
  backgroundColor: string;
}>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(0,0,0,0.5)"
      : props.isDraggingFromThis
        ? "rgba(255,255,255,0.5)"
        : ""};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0 0;
`;

export default CardListContainer;
