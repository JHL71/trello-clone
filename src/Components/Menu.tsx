import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, boardsState } from "../atoms";

const Wrap = styled.div`
  position: absolute;
  z-index: 10;
  transform: translate(15px, ${props => {
    if (Array.isArray(props.children))
      return `${12 * (props.children.length - 1)}px`
    else
      return '0px';
  }});
  width: 60px;
  height: ${props => {
    if (Array.isArray(props.children))
      return `${25 * props.children.length}px`
    else
      return '25px';
  }};
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  border-radius: 5px;
  overflow: hidden;
  div {
    text-align: center;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    border-bottom: solid black 1px;
    cursor: pointer;
    &:hover {
      background-color: #aaaaaa;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
`

interface MenuProps {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
}

const Menu = ({setMenu, boardId}: MenuProps) => {
  const setBoards = useSetRecoilState(boardsState);
  const setBoard = useSetRecoilState(boardState);

  const deleteBoard = () => {
    setBoard(oldBoard => {
      const newBoard = {...oldBoard}
      delete newBoard[boardId];
      return newBoard;
    });
    setBoards(oldBoards => {
      return oldBoards.filter((board) => board !== boardId);
    })
  }
  return (
    <>
      <Wrap onClick={deleteBoard}>
        <div>delete</div>
      </Wrap>
      <BackDrop onClick={() => setMenu(false)}/>
    </>
  )
}

export default Menu;