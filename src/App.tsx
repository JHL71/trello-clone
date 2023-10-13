import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";
import Board from "./Components/Board";


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`

const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    
    if (destination) {
      // setToDos(oldToDos => {
      //   const newToDos = [...oldToDos];
      //   const dels = newToDos.splice(source.index, 1);
      //   newToDos.splice(destination.index, 0, dels[0]);
      //   return newToDos;
      // })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
