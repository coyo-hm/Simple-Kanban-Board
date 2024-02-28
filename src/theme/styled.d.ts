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
    blue: string;
    boxColor: string;
    form: {
      label: string;
      inputBgHover: string;
      // input: string;
    };
    modal: {
      dimColor: string;
      bgColor: string;
    };
  }
}
