import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive : boolean;
    boardArray : IBoard[];
}
type TAddBoardAction = {
    board : IBoard
}

type TDeleteListAction = {
    boardId : string;
    listId : string;
}

type TAddListAction = {
    boardId : string;
    list: IList;
}

type TAddTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}

type TDeleteTaskAction = {
    boardId : string;
    listId : string;
    taskId : string;
}



const initialState = {
    modalActive: false,
    boardArray: [
        {
            boardId : 'board-0',
            boardName : '첫번째 게시물',
            lists: [
                {
                    listId : 'list-0',
                    listName : 'list1',
                    tasks:[
                        {
                            taskId : 'task-0',
                            taskName : 'task1',
                            taskDescription : 'Description',
                            taskOwner : 'john',
                        },
                        {
                            taskId : 'task-0',
                            taskName : 'task1',
                            taskDescription : 'Description',
                            taskOwner : 'john',
                        },
                        {
                            taskId : 'task-0',
                            taskName : 'task1',
                            taskDescription : 'Description',
                            taskOwner : 'john',
                        },
                        
                    ]
                },
                {
                    listId : 'list-1',
                    listName : 'list2',
                    tasks:[
                        {
                            taskId : 'task-3',
                            taskName : 'task3',
                            taskDescription : 'Description',
                            taskOwner : 'john',
                        },
                    ]
                },
                
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name : 'boards',
    initialState ,
    reducers :{
        addBoard : (state, {payload}: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board)
            //immer를 내부에서 사용하기 때문에 불변성을 어기는 Push 써도된다
        },
        deleteList: (state, {payload}: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId 
                ?
                {
                    ...board,
                    lists : board.lists.filter(
                        list => list.listId !== payload.listId
                    )
                }
                : board
            )
        },
        addList : (state, {payload}: PayloadAction<TAddListAction>) => {
            state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists : board.lists.push(payload.list)
                }
                : board)
        },
        addTask :(state, {payload}: PayloadAction<TAddTaskAction>)=> {
            state.boardArray.map(board =>
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists : board.lists.map(list => 
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks : list.tasks.push(payload.task)
                        }
                        : list
                    )
                }
                : board
            ) 
        },
        setModalActive : (state, {payload} : PayloadAction<boolean>) => {
            state.modalActive = payload
        },

        updateTask : (state, {payload} : PayloadAction<TAddTaskAction>) => {
            state.boardArray = state.boardArray.map(board => 
                board.boardId === payload.boardId ?
                {
                    ...board,
                    lists : board.lists.map(list => 
                        list.listId === payload.listId ?
                        {
                            ...list,
                            tasks: list.tasks.map(task => 
                                task.taskId === payload.task.taskId 
                                ? payload.task
                                : task
                            )
                        } : list    
                    )
                }
                : board
            )
        },
        deleteTask : (state, {payload}: PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(
                board => 
                    board.boardId === payload.boardId
                    ?
                    {
                        ...board,
                        lists: board.lists.map(list => 
                            list.listId === payload.listId
                            ? {
                                ...list,
                                tasks : list.tasks.filter(
                                    task => task.taskId !== payload.taskId
                                )
                            }
                            : list
                        )
                    }
                : board
            )
        },
    }
})

export const {addBoard, deleteList, setModalActive, addList, addTask, updateTask, deleteTask} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;