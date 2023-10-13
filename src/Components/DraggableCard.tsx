import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";
import React from "react";


const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`

interface IDraggbleCardProps {
  toDo: IToDo;
  index: number;
}

const DraggableCard = ({toDo, index}: IDraggbleCardProps) => {
  console.log(toDo.text, "has been rendered");
  return (
    <Draggable draggableId={`draggble-${toDo.id}`} index={index}>
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
  )
}

export default React.memo(DraggableCard);