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
    form: {
      label: string;
      inputBgHover: string;
      // input: string;
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
