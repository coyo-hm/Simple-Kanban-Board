import { atom } from "recoil";

export interface IToDoState {
  id: string;
  backgroundColor: string;
  list: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState[]>({
  key: "toDo",
  default: [],
});

export const colorChartState = atom<string[]>({
  key: "colorChart",
  default: ["#FF6F91", "#ee2a57", "#ffa25f", "#F9F871", "#845EC2"],
});
