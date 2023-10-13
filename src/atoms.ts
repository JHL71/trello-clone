import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom({
  key: "toDo",
  default: [
    {id: 1, text: "a"}, 
    {id: 2, text: "b"}, 
    {id: 3, text: "c"},
    {id: 4, text: "d"},
    {id: 5, text: "e"},
    {id: 6, text: "f"}
  ]
})