import styled from "styled-components";
import Button from "./Button";

const SaveButton = styled(Button)`
  width: fit-content;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;

  &:hover {
    background-color: ${(prop) => prop.theme.blue};
    color: white;
    border-color: ${(prop) => prop.theme.blue};
  }
`;

export default SaveButton;
