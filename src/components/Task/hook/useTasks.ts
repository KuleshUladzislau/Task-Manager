import {useEffect, useState} from "react";
import {useGetTasksQuery} from "../../../Dall/api";
import {TaskTypeAPI} from "../../../Dall/apiTypes";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import {changePage, setTotalCount} from "../../../redux/Slices/paginatorSlice";
import tasksPriority from "../../TasksPriority/TasksPriority";
import {setTask} from "../../../redux/Slices/tasksSlice";


export enum Status {
    New = 0,
    Completed = 1
}

export enum Priority {
    High = 0,
    Middle = 1,
    Low = 2
}

export type FilterType = 'all' | 'active' | 'done'
export type PriorityType = 'high' | 'middle' | 'low' | 'all'| 'completed'
export const useTasks = (todoId: string) => {


    const dispatch = useAppDispatch()
    const [timerId, setTimerId] = useState<number>()
    const [currentTask, setCurrentTask] = useState<string>('')
    const [viewTasks, setViewTask] = useState(false)

    const
        {
            page,
            pageSize,
            totalCount
        }
            = useAppSelector(state => state.pageSettings)


    const
        {
            data,
            isFetching,
            isSuccess,
            isError
        }
            = useGetTasksQuery(
            {
                todoId,
                pageSize
            }
        )


    useEffect(() => {
        if (getTotalCount) {
            dispatch(setTotalCount({totalCount}))
        }

        if (data) {
            dispatch(setTask({todoId, tasks: data.items}))
        }

        if (!isFetching) {
            const id = +setTimeout(() => {
                setViewTask(false)
            }, 300)
            setTimerId(id)
        }
        return () => clearTimeout(timerId)
    }, [data, isFetching])


    const tasks = data && data.items
    const getTotalCount = data ? data.totalCount : 5
    const pages = getTotalCount && Math.ceil(getTotalCount / pageSize)


    const changePageHandler = (page: number) => {
        setViewTask(true)
        dispatch(changePage({page, pageSize}));
    }


    const setHigh = () => setPriority('high')
    const setMiddle = () => setPriority('middle')
    const setLow = () => setPriority('low')
    const setAll = () => setPriority('all')


    const [priority, setPriority] = useState<PriorityType>('all')
    const priorityFilter = (priority: PriorityType, task: TaskTypeAPI[] | undefined) => {
        switch (priority) {
            case "high": {
                return task?.filter(task => task.priority === Priority.High)
            }
            case "middle": {
                return task?.filter(task => task.priority === Priority.Middle)
            }
            case "low": {
                return task?.filter(task => task.priority === Priority.Low)
            }
            case 'completed': {
                return task?.filter(task=>task.status !== Status.New)
            }
            default:
                return task
        }

    }

    const filteredTasks = priorityFilter(priority, tasks)


    return {
        filteredTasks,
        totalCount,
        page,
        pageSize,
        pages,
        priority,
        currentTask,
        isFetching,
        viewTasks,
        isSuccess,
        isError,
        setPriority,
        setHigh,
        setLow,
        setMiddle,
        setCurrentTask,
        changePageHandler,

    }
}