import styled from "styled-components";
import ToggleTheme from "../ToggleTheme";
import React from "react";

const HeaderContainer = styled.header`
  height: 45px;
  width: 100%;
  background-color: transparent;
  color: ${(prop) => prop.theme.textColor};
  font-weight: 800;
  font-size: 18px;
  line-height: 45px;
  padding: 0 10px 0 15px;
  display: flex;
  align-items: center;
`;

const Subtitle = styled.span`
  flex-grow: 1;
  //@media screen and (max-width: 970px) {
  //  & {
  //    visibility: hidden;
  //  }
  //}
`;

export default function Header() {
  return (
    <HeaderContainer>
      📖 KANBAN BOARD <Subtitle>: Make a simple board</Subtitle>
      <ToggleTheme />
    </HeaderContainer>
  );
}
