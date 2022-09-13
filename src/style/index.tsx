import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  width: 100%;
  /* display: grid; */
  /* gap: 10px; */
  /* grid-template-columns: repeat(3, 1fr); */
  display: flex;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    //스크롤바 전체
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    //스크롤 막대
    background: rgb(0, 0, 0);
  }
  &::-webkit-scrollbar-track {
    //스크롤 막대 외부
    background: rgb(0, 0, 0, 0.3);
  }
`;

export const BoardContainer = styled.div`
  width: 230px;
  margin-right: 10px;
  padding: 10px 0;
  background-color: ${(prop) => prop.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#3c6382" : props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};

  &:last-child {
    margin: 0;
  }
`;
