import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, boardsState } from "./atoms";
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
  const [board, setBoard] = useRecoilState(boardState);
  const [boards, setBoards] = useRecoilState(boardsState);

  const onDragEnd = ({source, destination}: DropResult) => {
    if (!destination) return ;
    console.log(source, destination);
    if (source.droppableId === "board") {

    } else {
      if (destination.droppableId === source.droppableId) {
        setBoard(oldBoards => {
          const newBoard = [...oldBoards[destination.droppableId]];
          const [moveItem] = newBoard.splice(source.index, 1);
          newBoard.splice(destination.index, 0, moveItem);
          return {...oldBoards, 
            [destination.droppableId]: newBoard, 
          };
        });
      } else {
        setBoard(oldBoards => {
          const destinationBoard = [...oldBoards[destination.droppableId]];
          const sourceBoard = [...oldBoards[source.droppableId]];
          const [moveCard] = sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, moveCard);
          return {...oldBoards, 
            [destination.droppableId]: destinationBoard, 
            [source.droppableId]: sourceBoard
          };
        });
      }
    }
      
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="board" direction="horizontal" type="BOARD">
          {(provided, snapshot) => (
            <Boards
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boards.map((boardId, index) => (
                <Board 
                  key={boardId} 
                  boardId={boardId} 
                  toDos={board[boardId]} 
                  index={index} 
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
