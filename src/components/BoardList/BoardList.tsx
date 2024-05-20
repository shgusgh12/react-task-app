import React, {FC, useRef, useState} from 'react'
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';

type TBoardListProps ={
  activeBoardId : string;
  setActiveBoardId : React.Dispatch<React.SetStateAction<string>>
}

const BoardList : FC<TBoardListProps> = ({
  activeBoardId, 
  setActiveBoardId,
  }) => {

  const boards = useTypedSelector(state => state.boards.boardArray);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //setTimeOut 쓰는 이유 => IsFormOpen이 변경되어야 sideForm이 렌더링 된다
  //그 다음 ref가 등록이 되면서 focus가 작동함 조금의 시간이 필요함
  const handleClick = () => {
     setIsFormOpen(!isFormOpen)
     setTimeout(() => {
      inputRef.current?.focus();
     },0)
  }

  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {
        boards.map((board, index) => {
          return(
            <div key={board.boardId}
            onClick={() => setActiveBoardId(boards[index].boardId)}
              className={
                clsx(
                  {
                    [boardItemActive] :
                    boards.findIndex(b => b.boardId === activeBoardId) === index,
                  },
                  {
                    [boardItem]:
                    boards.findIndex(b => b.boardId === activeBoardId) !== index
                  }
                )
              }
              >
              <div>
                {board.boardName}
              </div>
            </div>
          )
        })
      }
      <div className={addSection}>
        {
          isFormOpen ? 
          <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen}/> : 
          <FiPlusCircle className={addButton} onClick={handleClick}/>
        }
      </div>
    </div>
  )
}

export default BoardList
