import styled from "styled-components";

const BoardListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-y: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(0, 0, 0);
  }
  &::-webkit-scrollbar-track {
    background: rgb(0, 0, 0, 0.3);
  }
`;

export default BoardListContainer;
