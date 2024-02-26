import styled from "styled-components";
import Button from "./Button";

const ToolbarButton = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 7px;
  padding: 3px 15px;
  font-size: 14px;
  border-radius: 32px;

  span {
    font-size: 16px;
  }
`;

export default ToolbarButton;
