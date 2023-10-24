
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "../atoms";

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  height: 200px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  color: green;
  font-size: 48px;
  svg {
    cursor: pointer;
  }
`

const Header = () => {
  const setModal = useSetRecoilState(modalState);
  return (
    <Wrap>
      <Icon>
        <FontAwesomeIcon icon={faSquarePlus} onClick={() => setModal(true)}/>
      </Icon>
    </Wrap>
  )
}

export default Header;