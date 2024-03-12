import styled from "styled-components";
import Button from "./Button";

const IconButton = styled(Button)<{ backgroundColor: string }>`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${(prop) =>
    prop.theme.key === "dark" ? prop.backgroundColor : prop.theme.textColor};
  border: 2px solid
    ${(prop) =>
      prop.theme.key === "dark" ? prop.backgroundColor : prop.theme.textColor};
  background-color: transparent;

  &:hover {
    color: ${(prop) => prop.theme.blue};
    border-color: ${(prop) => prop.theme.blue};
  }
`;

export default IconButton;
