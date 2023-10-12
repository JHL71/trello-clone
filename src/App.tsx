import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`

const Card = styled.li`
  background-color: ${props => props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`

const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`

const Board = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    
    if (destination) {
      setToDos(oldToDos => {
        const newToDos = [...oldToDos];
        const dels = newToDos.splice(source.index, 1);
        newToDos.splice(destination.index, 0, dels[0]);
        return newToDos;
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided) => 
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable draggableId={`draggble-${toDo.id}`} index={index} key={toDo.id}>
                    {(provided) => (
                      <Card 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                      >
                        <h4>{toDo.text}</h4>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            }
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
