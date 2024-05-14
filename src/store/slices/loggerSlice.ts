import { createSlice } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

type LoggerState = {
    logArray : ILogItem[];
}

const initialState = {
    logArray : []
}

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers : {

    }
})

export const loggerReducer = loggerSlice.reducer;