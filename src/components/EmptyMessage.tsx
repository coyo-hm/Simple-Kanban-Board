import React from "react";
import styled from "styled-components";

const EmptyMessageContainer = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  padding: 50px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
`;

export default function EmptyMessage() {
  return <EmptyMessageContainer>생성된 보드가 없습니다.</EmptyMessageContainer>;
}
