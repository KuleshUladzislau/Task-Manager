import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type PaginatorSliceType ={
    page:number
    pageSize: number
    totalCount: number
}
const initialState:PaginatorSliceType = {
    page:1,
    pageSize:5,
    totalCount:0
}

const paginatorSlice = createSlice({
    name:'paginator',
    initialState,
    reducers:{
        setPageSettings(state,action:PayloadAction<PaginatorSliceType>){
            state = action.payload
            console.log(action.payload)
        },
        changePage(state,action:PayloadAction<{page:number,pageSize:number}>){
            state.page = action.payload.page
            state.pageSize = action.payload.pageSize
        },
        resetTaskPageSetting(state){
            state.page = 1
        },
        setTotalCount(state,action:PayloadAction<{totalCount:number}>){
            state.totalCount = action.payload.totalCount
        }
    }
})

export const {setTotalCount,setPageSettings,changePage,resetTaskPageSetting } = paginatorSlice.actions
export default paginatorSlice.reducer