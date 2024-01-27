import { Helmet } from "react-helmet";
import styled from "styled-components";
import ToggleTheme from "../theme/ToggleTheme";
import DroppableArea from "../components/DroppableArea";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 550px;
`;

const Header = styled.header`
  height: 100px;
  width: 100%;
  background-color: ${(prop) => prop.theme.boardColor};
  color: ${(prop) => prop.theme.bgColor};
  font-weight: 800;
  font-size: 48px;
  line-height: 100px;
  padding: 0 20px;
  position: relative;
`;

const Subtitle = styled.span`
  @media screen and (max-width: 970px) {
    & {
      visibility: hidden;
    }
  }
`;

export default function Home() {
  return (
    <Container>
      <Helmet>
        <title>SIMPLE KANBAN BOARD</title>
      </Helmet>
      <Header>
        📖 KANBAN BOARD <Subtitle>: Make a simple note</Subtitle>
        <ToggleTheme />
      </Header>
      <DroppableArea />
    </Container>
  );
}
