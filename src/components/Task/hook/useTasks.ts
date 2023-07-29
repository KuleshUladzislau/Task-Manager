import React, {ChangeEvent, useEffect, useState} from "react";
import {useChangePageTasksQuery, useGetTasksQuery} from "../../../Dall/api";
import {TaskTypeAPI} from "../../../Dall/apiTypes";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import {changePage, setPageSettings} from "../../../redux/Slices/paginatorSlice";

export enum Status {
    New = 0,
    Completed = 1
}

export type FilterType = 'all' | 'active' | 'done'
export const useTasks = (todoId: string) => {
    const dispatch = useAppDispatch()

    const {page, pageSize, totalCount} = useAppSelector(state => state.pageSettings)
    const {data,isLoading} = useGetTasksQuery({todoId, pageSize, page})


    const tasks = data && data.items
    const getTotalCount = data ? data.totalCount : 5
    const pages = getTotalCount && Math.ceil(getTotalCount / pageSize)

    const changePageHandler = (page: number,e:any) => {

        dispatch(changePage({page, pageSize}))
    }


    useEffect(() => {
        if (getTotalCount) {
            dispatch(setPageSettings({page, pageSize, totalCount: getTotalCount}))
        }
    }, [data])



    const [filter, setFilter] = useState<FilterType>('all')
    const setAll = () => setFilter('all')
    const setActive = () => setFilter('active')
    const setDone = () => setFilter('done')


    const taskFilter = (filter: FilterType, task: TaskTypeAPI[] | undefined) => {

        switch (filter) {
            case "active":
                return task?.filter(t => t.status === Status.New)
            case "done":
                return task?.filter(t => t.status === Status.Completed)
            default:
                return task
        }

    }
    const filteredTask = taskFilter(filter, tasks)


    return {
        filteredTask,
        totalCount,
        page,
        pageSize,
        pages,
        isLoading,
        filter,
        changePageHandler,
        setAll,
        setActive,
        setDone
    }
}