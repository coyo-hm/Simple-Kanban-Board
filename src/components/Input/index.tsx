import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  color: ${(prop) => prop.theme.input.label};
  background-color: ${(prop) => prop.theme.modal.bgColor};

  &::placeholder {
  }

  &:hover {
    background-color: ${(prop) => prop.theme.input.bgHover};
  }

  &:focus,
  &:focus-within {
    background-color: ${(prop) => prop.theme.modal.bgColor};
    box-shadow: 4px 3px 15px -3px ${(prop) => prop.theme.input.boxShadow};
  }
`;

export default Input;
