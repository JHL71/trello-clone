import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}

interface IBoardState {
  [key: string]: IToDo[];
}

export const boardState = atom<IBoardState>({
  key: "board",
  default: {
    to_do : [],
    doing: [],
    done: [],
  }
})