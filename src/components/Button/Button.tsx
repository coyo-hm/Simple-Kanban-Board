import styled from "styled-components";

const Button = styled.button`
  color: ${(prop) => prop.theme.textColor};
  border: 1px solid ${(prop) => prop.theme.textColor};
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(prop) => prop.theme.buttonHoverColor};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Button;
