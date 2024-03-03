import styled from "styled-components";

const BoardContainer = styled.div<{ backgroundColor: string }>`
  width: 230px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(prop) =>
    prop.backgroundColor + prop.theme.board.bgOpacity};

  & > header {
    display: flex;
    margin-bottom: 15px;
  }

  .title {
    flex-grow: 1;
    text-align: left;
    color: ${(prop) => prop.theme.board.textColor};
    font-size: 24px;
    font-weight: 700;
  }
`;

export default BoardContainer;
