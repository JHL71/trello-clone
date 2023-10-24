import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, boardsState, modalState } from "../atoms";


const BackDrop = styled.div`
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

const Contents = styled.div`
  position: absolute;
  z-index: 12;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  border-radius: 20px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'a b c'
    'h h h';
  align-items: center;
  input {
    margin-top: 20px;
    grid-area: b;
    height: 50px;
    border: none;
    border-bottom: solid black 2px;
    outline: none;
    text-align: center;
    font-size: 24px;
    width: 200px;
  }
`

const Form = styled.form`
  
`

const ButtonWrap = styled.div`
  grid-area: h;
  margin: 0 auto;
  button {
    width: 100px;
    cursor: pointer;
    font-size: 15px;
    background-color: transparent;
    border: none;
    &:hover {
      background: linear-gradient(90deg, white, #51ff51, white);
    }
  }
  button:first-child {
    margin-right: 30px;
    color: green;
  }
  button:last-child {
    color: red;
  }
`

interface IForm {
  name: string;
}

const AddBoard = () => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [boards, setBoards] = useRecoilState(boardsState);
  const setBoard = useSetRecoilState(boardState);
  const setModal = useSetRecoilState(modalState);

  const changeBN = (name: string) => {
    return name.includes(' ') ? name.split(' ')
      .map((el)=> el[0].toLowerCase() + el.slice(1))
      .join('_') : name[0].toLowerCase + name.slice(1);
  }

  const onValid = ({ name }: IForm) => {
    if (boards.includes(changeBN(name))) {
      console.log(boards.includes(changeBN(name)));
    } else {
      setValue("name", "");
      setBoards(oldBoards => {
        return [name, ...oldBoards];
      });
      setBoard(oldBoard => {
        return {...oldBoard, [name]: []}
      })
      setModal(false);
    }
  }

  const onCancel = () => {
    setModal(false);
  }

  return (
    <>
      <BackDrop onClick={() => setModal(false)}/>
      <Form>
        <Contents>
          <input 
            {...register("name", {
              required: true
            })} 
            type="text"
            placeholder="board name"
          />
          <ButtonWrap>
            <button onClick={handleSubmit(onValid)}>Add</button>
            <button onClick={handleSubmit(onCancel)}>Cancel</button>
          </ButtonWrap>
        </Contents>
      </Form>
    </>
  )
}

export default AddBoard;