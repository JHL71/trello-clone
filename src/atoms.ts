import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do : [
      {id: 1, text: "a"}, 
      {id: 2, text: "b"}, 
      {id: 3, text: "c"},
      {id: 4, text: "d"},
      {id: 5, text: "e"},
      {id: 6, text: "f"}
    ],
    doing: [
      {id: 7, text: "g"},
      {id: 8, text: "h"},
      {id: 9, text: "i"}
    ],
    done: [
      {id: 10, text: "j"},
      {id: 11, text: "k"}
    ],
  }
})