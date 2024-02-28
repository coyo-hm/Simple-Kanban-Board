import styled from "styled-components";
import Button from "./Button";
import IconBinClosed from "../../images/Icon_bin_closed.png";
import IconBinOpened from "../../images/Icon_bin_opened.png";

const DeleteButton = styled(Button)`
  background: transparent url(${IconBinClosed}) no-repeat center/50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  margin: 30px auto;
  padding: 0 0 0 50px;
  //position: absolute;
  //bottom: calc(50% - 250px);

  &:hover {
    background: rgba(255, 0, 0, 0.2) url(${IconBinOpened}) no-repeat center/50px;
  }
`;

export default DeleteButton;
