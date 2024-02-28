import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../../stores";
import ToolbarButton from "./ToolbarButton";
import { ReactComponent as IconReset } from "../../images/reset.svg";

export default function ResetButton() {
  const setToDos = useSetRecoilState(toDoState);
  const onResetToDos = () => {
    setToDos([]);
  };

  return (
    <ToolbarButton onClick={onResetToDos}>
      <IconReset width={14} height={14} strokeWidth={2} /> 보드 초기화하기
    </ToolbarButton>
  );
}
