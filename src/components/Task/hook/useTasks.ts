import {useEffect, useState} from "react";
import {useGetTasksQuery} from "../../../Dall/api";
import {TaskTypeAPI} from "../../../Dall/apiTypes";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import {changePage, setPageSettings, setTotalCount} from "../../../redux/Slices/paginatorSlice";

export enum Status {
    New = 0,
    Completed = 1
}

export type FilterType = 'all' | 'active' | 'done'
export const useTasks = (todoId: string) => {


    const dispatch = useAppDispatch()
    const {
        page,
        pageSize,
        totalCount
    } = useAppSelector(state => state.pageSettings)
    const {
        data,
        isFetching,
        isSuccess,
        refetch
    }
        = useGetTasksQuery({
        todoId,
        page,
        pageSize
    })

    const [
        currentTask,
        setCurrentTask
    ] = useState<string>('')
    const [
        viewTasks,
        setViewTask
    ] = useState(false)

    const tasks = data && data.items
    const getTotalCount = data ? data.totalCount : 5
    const pages = getTotalCount && Math.ceil(getTotalCount / pageSize)


    useEffect(() => {
        if (getTotalCount) {
            dispatch(setTotalCount({totalCount}))
        }
        if (!isFetching) {
            setTimeout(()=>{
                setViewTask(false)
            },500)
        }


    }, [data, isFetching])
    const changePageHandler = (page: number) => {
        setViewTask(true)
        refetch()
        dispatch(changePage({page, pageSize}));
    }


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
        filter,
        currentTask,
        isFetching,
        viewTasks,
        isSuccess,
        setCurrentTask,
        changePageHandler,
        setAll,
        setActive,
        setDone
    }
}