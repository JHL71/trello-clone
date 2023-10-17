import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrap = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
  transform: translate(0, -50%);
`
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`

const DeleteBox = () => {
  return (
    <Wrap>
      <Droppable droppableId="trash" type="TASK">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Wrap>
  )
}

export default DeleteBox;