import styled from "styled-components";

const BoardListContainer = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BoardListContainer;
