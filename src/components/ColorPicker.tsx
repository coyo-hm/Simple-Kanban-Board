import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { UseFormReturn } from "react-hook-form";
import { HuePicker } from "react-color";

import { colorChartState } from "../stores";
import { IFormInput } from "./Modal/EditModal";
import Input from "./Input";
import Button from "./Button/Button";
import SaveButton from "./Button/SaveButton";

import { ReactComponent as IconAdd } from "../images/Icon_add.svg";

type DirectionType = "left" | "right";

const ColorPickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;

  .addContainer {
    position: relative;
  }
`;

const ColorChipContainer = styled.div`
  position: relative;

  & > button {
    visibility: hidden;
  }

  &:hover > button {
    visibility: visible;
  }

  & > button:hover {
    visibility: visible;
  }
`;

const ColorChip = styled.input<{ bgColor: string }>`
  vertical-align: middle;
  appearance: none;
  outline: none;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 4px solid ${(prop) => prop.theme.textColor};
  cursor: pointer;
  margin: 0;

  &:checked {
    border-color: ${(prop) => prop.theme.blue};
  }

  &:hover,
  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted ${(prop) => prop.theme.blue};
  }
`;

const AddButton = styled(Button)`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 4px solid ${(prop) => prop.theme.textColor};
  color: ${(prop) => prop.theme.textColor};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${(prop) => prop.theme.blue};
    color: ${(prop) => prop.theme.blue};
  }
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  padding: 0;
  font-weight: 900;
  font-size: 12px;
  text-align: center;

  &:hover {
    background-color: red;
  }
`;

const AdditionalColorPickerContainer = styled.div<{ dir: DirectionType }>`
  position: absolute;
  top: calc(100% + 10px);
  right: ${(props) => (props.dir === "right" ? "-5px" : "unset")};
  left: ${(props) => (props.dir === "left" ? "-5px" : "unset")};

  .container {
    gap: 15px;
    display: grid;
    grid-template-areas: "circle text" "picker picker" "footer footer";
    background-color: ${(prop) => prop.theme.modal.bgColor};
    overflow: hidden;
    border: none;
    border-radius: 10px;
    padding: 15px;
  }

  .picker {
    grid-area: picker;
  }

  footer {
    grid-area: footer;
    display: flex;
    justify-content: center;
    gap: 5px;

    button {
      margin: 0 !important;
      font-size: 12px !important;
    }
  }

  &::before {
    content: " ";
    position: absolute;
    top: -10px;
    right: ${(props) => (props.dir === "right" ? "10px" : "unset")};
    left: ${(props) => (props.dir === "left" ? "10px" : "unset")};
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: rgba(0, 0, 0, 0.8);
  }
`;

const ColorCircle = styled.div<{ bgColor: string }>`
  grid-area: circle;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.textColor};
  width: 35px;
  height: 35px;
  background-color: ${(props) => props.bgColor};
`;

const ColorInput = styled(Input)`
  grid-area: text;
  width: 150px;
`;

interface Props {
  Form: UseFormReturn<IFormInput>;
}

export default function ColorPicker({
  Form: { getValues, setValue, register },
}: Props) {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState<string>("");
  const [colorChart, setColorChart] = useRecoilState(colorChartState);
  const [direction, setDirection] = useState<DirectionType>("right");

  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setColor(getValues("backgroundColor"));
  }, []);

  useEffect(() => {
    let dir: DirectionType = "right";
    if (buttonRef.current) {
      const { left } = buttonRef.current.getBoundingClientRect();
      if (left - 230 < 0) {
        dir = "left";
      }
    }
    setDirection(dir);
  }, [colorChart]);

  const onClickPicker = useCallback(
    (e: MouseEvent) => {
      const target = e?.target as Node;
      if (buttonRef?.current && buttonRef?.current.contains(target)) {
        return;
      }
      if (pickerRef?.current && !pickerRef?.current.contains(target)) {
        setShow(false);
      }
    },
    [pickerRef, buttonRef],
  );

  useEffect(() => {
    if (show) {
      window.addEventListener("click", onClickPicker);
    } else {
      window.removeEventListener("click", onClickPicker);
    }
  }, [show]);

  const onDeleteColor = (color: string) => {
    setColorChart((prev) => prev.filter((c) => color !== c));
  };

  const onAddColor = () =>
    setColorChart((prev) => (prev.includes(color) ? prev : [...prev, color]));

  const onSaveColor = () => {
    onAddColor();
    setValue("backgroundColor", color);
  };

  return (
    <ColorPickerContainer>
      {colorChart.map((color) => (
        <ColorChipContainer key={color}>
          <ColorChip
            id={`backgroundColor_${color}`}
            type={"radio"}
            value={color}
            bgColor={color}
            {...register("backgroundColor", { required: true })}
            name={"backgroundColor"}
          />
          <DeleteButton type={"button"} onClick={() => onDeleteColor(color)}>
            -
          </DeleteButton>
        </ColorChipContainer>
      ))}
      <div className={"addContainer"}>
        <AddButton
          type={"button"}
          onClick={() => setShow((prev) => !prev)}
          ref={buttonRef}
        >
          <IconAdd width={30} height={30} />
        </AddButton>
        {show && (
          <AdditionalColorPickerContainer dir={direction}>
            <div className={"container"} ref={pickerRef}>
              <ColorCircle bgColor={color} />
              <ColorInput
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <HuePicker
                className={"picker"}
                width={"200px"}
                color={color}
                onChange={(color) => setColor(color.hex)}
              />
              <footer>
                <SaveButton onClick={onAddColor} type={"button"}>
                  추가
                </SaveButton>
                <SaveButton onClick={onSaveColor} type={"button"}>
                  저장
                </SaveButton>
              </footer>
            </div>
          </AdditionalColorPickerContainer>
        )}
      </div>
    </ColorPickerContainer>
  );
}
