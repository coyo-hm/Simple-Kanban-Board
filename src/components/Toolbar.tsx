import React from "react";
import styled from "styled-components";
import CreateButton from "./CreateButton";

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 0 10px;
`;

export default function Toolbar() {
  return (
    <ToolbarWrapper>
      <CreateButton />
    </ToolbarWrapper>
  );
}
