import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";


const Li = styled.li`
  padding: 20px;
`

function App() {
  const onDragEnd = () => {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => 
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="draggble-1" index={0}>
                {(provided) => (
                  <Li 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                  >
                    <h4>one</h4>
                  </Li>
                )}
              </Draggable>
              <Draggable draggableId="draggable-2" index={1}>
                {(provided) => (
                  <Li 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                  >
                    <h4>two</h4>
                  </Li>
                )}
              </Draggable>
              {provided.placeholder}
            </ul>
          }
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
