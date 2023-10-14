import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo } from "../atoms";
import styled from "styled-components";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Wrapper = styled.div`
  padding: 15px 10px 20px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`

interface IArea {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.div<IArea>`
  background-color: ${props => props.$isDraggingOver ? "pink" : props.$isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
`

const Board = ({toDos, boardId}: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId.split('_').map((el)=> el[0].toUpperCase() + el.slice(1)).join(' ')}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => 
          <Area 
            $isDraggingOver={snapshot.isDraggingOver} 
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        }
      </Droppable>
    </Wrapper>
  )
}

export default Board;