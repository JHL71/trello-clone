import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo } from "../atoms";
import styled from "styled-components";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Wrapper = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

const Board = ({toDos, boardId}: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => 
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo.id} toDo={toDo} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      }
    </Droppable>
  )
}

export default Board;