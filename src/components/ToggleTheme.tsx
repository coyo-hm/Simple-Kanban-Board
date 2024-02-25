import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";

interface IToggle {
  isDark: boolean;
}

const ToggleWrapper = styled.div<IToggle>`
  width: 50px;
  height: 24px;
  position: relative;

  label {
    position: absolute;
    width: 50px;
    height: 24px;
    background-color: ${(props) => (props.isDark ? "#28292c" : "#cbcbc9")};
    border-radius: 28px;
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
      border-radius: 28px;
      transition: 0.3s;
      border: none;
    }

    input:checked ~ .slider {
      background-color: #cbcbc9;
    }

    .slider::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 10px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-shadow: inset 6px -2px 0px 0px white;
      background-color: #28292c;
      transition: 0.3s;
    }

    input:checked ~ .slider::before {
      transform: translateX(20px);
      background-color: white;
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
          readOnly
        />
        <span className="slider"></span>
      </label>
    </ToggleWrapper>
  );
}
