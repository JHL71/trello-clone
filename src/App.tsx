import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState, boardsState, modalState } from "./atoms";
import Board from "./Components/Board";
import DeleteBox from "./Components/DeleteBox";
import Header from "./Components/Header";
import AddBoard from "./Components/AddBoard";


const Wrapper = styled.div`
  display: flex;
  width: 680px;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`

const Boards = styled.div`
  width: 100%;
  display: flex;
  padding-left: 10px;
`

function App() {
  const [board, setBoard] = useRecoilState(boardState);
  const [boards, setBoards] = useRecoilState(boardsState);
  const modal = useRecoilValue(modalState);

  const onDragEnd = ({source, destination}: DropResult) => {
    if (!destination) return ;
    console.log(source, destination);
    if (source.droppableId === "board") {
      setBoards(oldBoards => {
        const newBoards = [...oldBoards];
        const [moveBoard] = newBoards.splice(source.index, 1);
        newBoards.splice(destination.index, 0, moveBoard);
        return newBoards;
      })
    } else if (destination.droppableId === "trash") {
      setBoard(oldBoards => {
        const newBoard = [...oldBoards[source.droppableId]];
        newBoard.splice(source.index, 1);
        return {
          ...oldBoards,
          [source.droppableId]: newBoard
        }
      })
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
    <>
      <Header />
      {modal && <AddBoard />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="board" direction="horizontal" type="BOARD">
            {(provided) => (
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
        <DeleteBox />
      </DragDropContext>
    </>
  );
}

export default App;
