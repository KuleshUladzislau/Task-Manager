import React from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Priority} from "../../components/Task/hook/useTasks";


type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type stateType = {
    [key: string]: { tasks:TaskType[] },


}
const initialState: stateType = {}

const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        setTask(state, action) {
            const {todoId, tasks} = action.payload

                state[todoId]= tasks


        }
    }

})

export const {setTask} = tasksSlice.actions
export default tasksSlice.reducer