import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardsState = {
    modalActive : boolean;
    boardArray : IBoard[];
}

const initialState = {
    modalActive: false,
    boardArray: [
        {
            boardId : 'boad-0',
            boardName : '첫번째',
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
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name : 'boards',
    initialState ,
    reducers :{

    }
})

export const boardsReducer = boardsSlice.reducer;