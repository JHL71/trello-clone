import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


function App() {
  const onDragEnd = () => {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provider) => (
            <ul ref={provider.innerRef} {...provider.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provider) => (
                  <li 
                    ref={provider.innerRef} 
                    {...provider.draggableProps} 
                  >
                    <span {...provider.dragHandleProps}>🔥</span>
                    One
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
