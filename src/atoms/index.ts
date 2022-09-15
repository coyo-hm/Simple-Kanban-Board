import { atom } from "recoil";

export interface IToDoState {
  id: string;
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
