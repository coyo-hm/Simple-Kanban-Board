import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ToggleTheme from "../components/ToggleTheme";
import DroppableArea from "../components/DroppableArea";
import Toolbar from "../components/Toolbar";
import ModalProvider from "../contexts/ModalContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  justify-content: stretch;
  align-items: flex-start;
`;

const Header = styled.header`
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

export default function Home() {
  return (
    <Container>
      <ModalProvider>
        <Helmet>
          <title>SIMPLE KANBAN BOARD</title>
        </Helmet>
        <Header>
          📖 KANBAN BOARD <Subtitle>: Make a simple board</Subtitle>
          <ToggleTheme />
        </Header>
        <Toolbar />
        <DroppableArea />
      </ModalProvider>
    </Container>
  );
}
