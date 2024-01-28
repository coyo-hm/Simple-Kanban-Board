import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    cardColor: string;
    boardColor: string;
    boardTitleColor: string;
    hoverColor: string;
    buttonHoverColor: string;

    modal: {
      dimColor: string;
      bgColor: string;
    };
  }
}
