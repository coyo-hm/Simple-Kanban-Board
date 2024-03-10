import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";
import { ReactComponent as IconEdit } from "../../images/Icon_edit.svg";

const Container = styled.button<{ backgroundColor: string }>`
  ${Button};
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${(prop) =>
    prop.theme.key === "dark" ? prop.backgroundColor : "white"};
  border: 2px solid
    ${(prop) => (prop.theme.key === "dark" ? prop.backgroundColor : "white")};

  &:hover {
    color: ${(prop) => prop.theme.blue};
    border-color: ${(prop) => prop.theme.blue};
  }
`;

interface Props extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

export default function EditButton({ backgroundColor, ...rest }: Props) {
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      <IconEdit width={24} height={24} strokeWidth={1.5} />
    </Container>
  );
}
