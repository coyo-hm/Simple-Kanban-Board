import React from "react";
import styled from "styled-components";
import CreateButton from "../Button/CreateButton";
import ResetButton from "../Button/ResetButton";

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: right;
  padding: 0 15px;
  gap: 10px;
`;

export default function Toolbar() {
  return (
    <ToolbarContainer>
      <CreateButton />
      <ResetButton />
    </ToolbarContainer>
  );
}
