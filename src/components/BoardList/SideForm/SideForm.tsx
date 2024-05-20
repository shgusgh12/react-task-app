import React, {ChangeEvent, FC, useRef, useState} from 'react'
import { FiCheck } from 'react-icons/fi'
import { icon, input, sideForm } from './SideForm.css'
import { addBoard } from '../../../store/slices/boardsSlice'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addLog } from '../../../store/slices/loggerSlice';

type TSideFormProps = {
  inputRef : React.RefObject<HTMLInputElement>,
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const SideForm: FC<TSideFormProps>= ({
  setIsFormOpen,
  inputRef,
}) => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch();

  const handleChange =(e : ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  //포커스가 나가면 Input 사라지게하기
  const handleOnBlur = () => {
    setIsFormOpen(false);
  }

  const handleClick =() => {
    if(inputText){
      dispatch(
        addBoard({board : {
          boardId: uuidv4(), 
          boardName: inputText,
          lists: []
          }
        })
      )
      dispatch(
        addLog({
          logId : uuidv4(),
          logMessage : `게시판 등록: ${inputText}`,
          logAuthor: 'User',
          logTimestamp : String(Date.now()),
        })
      )
    }
  }
  return (
    <div className={sideForm}>
      <input 
        className={input}
        ref={inputRef}
        type='text'
        placeholder='새로운 게시판 등록하기'  
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      {/* blur onmousedown mouseup click 순서로 적용 */}
      <FiCheck className={icon} onMouseDown={handleClick}/>
    </div>
  )
}

export default SideForm
