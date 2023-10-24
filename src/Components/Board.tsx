import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo, boardState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

const TitleWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'a b c';
  justify-items: center;
  align-items: center;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  grid-area: b;
`

const ButtonWrap = styled.div`
  grid-area: c;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
`

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  padding-right: 15px;
  cursor: pointer;
`

interface IArea {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.div<IArea>`
  padding: 20px;
  background-color: ${props => props.$isDraggingOver 
    ? "#F9DFE6" 
    : props.$isDraggingFromThis 
    ? "#E4F7FB" 
    : "#E8EBEF"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
`

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`

interface IForm {
  toDo: string;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

const Board = ({toDos, boardId, index}: IBoardProps) => {
  const { register, setValue, handleSubmit} = useForm<IForm>();
  const [menu, setMenu] = useState(false);
  const setBoard = useSetRecoilState(boardState);

  const boardTitle = boardId.split('_').map((el)=> el[0].toUpperCase() + el.slice(1)).join(' ');

  const onValid = ({ toDo }: IForm) => {
    
    const newToDo = {
      id: Date.now(),
      text: toDo
    }
    setBoard(Boards => {
      return { ...Boards, [boardId]: [newToDo, ...Boards[boardId]] };
    })
    setValue("toDo", "");
  }

  return (
    <Draggable draggableId={`draggble-${boardId}`} index={index}>
      {(provided) => (
        <Wrapper 
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <TitleWrap>
            <Title {...provided.dragHandleProps}>
              {boardTitle}
            </Title>
            <ButtonWrap>
              <DeleteButton>
                <FontAwesomeIcon icon={faEllipsis} onClick={() => setMenu(true)}/>
              </DeleteButton>
              {
                menu && <Menu setMenu={setMenu} boardId={boardId}/>
              }
            </ButtonWrap>
          </TitleWrap>
          <Form onSubmit={handleSubmit(onValid)}>
            <input 
              {...register("toDo", { 
                required: true 
              })} 
              type="text" 
              placeholder={`Add task on ${boardTitle}`}
            />
          </Form>
          <Droppable droppableId={boardId} type="TASK">
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
      )}  
    </Draggable>
  )
}

export default React.memo(Board);