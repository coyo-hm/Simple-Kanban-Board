import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    key: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
    buttonHoverColor: string;
    blue: string;
    boxColor: string;
    input: {
      label: string;
      boxShadow: string;
      bgHover: string;
      bgFocus: string;
    };
    modal: {
      dimColor: string;
      bgColor: string;
    };
    board: {
      textColor: string;
      bgOpacity: string;
    };
  }
}
