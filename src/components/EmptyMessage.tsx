import React, { ReactNode } from "react";
import styled from "styled-components";

const EmptyMessageContainer = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  padding: 50px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
`;

interface Props {
  label: ReactNode;
}

export default function EmptyMessage({ label }: Props) {
  return (
    <EmptyMessageContainer>생성된 {label}가 없습니다.</EmptyMessageContainer>
  );
}
