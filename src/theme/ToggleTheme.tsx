import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";

interface IToggle {
  isDark: boolean;
}
const ToggleWrapper = styled.div<IToggle>`
  position: absolute;
  width: 200px;

  top: 27px;
  left: calc(50% + 120px);

  label {
    position: absolute;
    width: 100px;
    height: 46px;
    background-color: ${(props) => (props.isDark ? "#28292c" : "white")};
    border-radius: 50px;
    cursor: pointer;
    border: none;
    input {
      position: absolute;
      display: none;
    }

    .slider {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50px;
      transition: 0.3s;
      border: none;
    }

    input:checked ~ .slider {
      background-color: white;
    }

    .slider::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: inset 12px -2px 0px 0px white;
      background-color: #28292c;

      transition: 0.3s;
    }

    input:checked ~ .slider::before {
      transform: translateX(50px);
      background-color: #28292c;
      box-shadow: none;
    }
  }
`;

export default function ToggleTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ToggleWrapper isDark={theme === "dark"}>
      <label>
        <input
          type="checkbox"
          checked={theme !== "dark"}
          onClick={toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </ToggleWrapper>
  );
}
