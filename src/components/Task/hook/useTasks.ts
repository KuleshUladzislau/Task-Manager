import {useEffect, useState} from "react";
import {useGetTasksQuery} from "../../../services/api";
import {TaskTypeAPI} from "../../../services/apiTypes";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import {changePage, setTotalCount} from "../../../redux/Slices/paginatorSlice";
import {setTask} from "../../../redux/Slices/tasksSlice";
import {skipToken} from "@reduxjs/toolkit/query";


export enum Status {
    New = 0,
    Completed = 1
}

export enum Priority {
    High = 0,
    Middle = 1,
    Low = 2
}


export type PriorityType = 'high' | 'middle' | 'low' | 'all' | 'completed'
export const useTasks = (todoId: string) => {



    const dispatch = useAppDispatch()
    const [currentTask, setCurrentTask] = useState<string>('')

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

        }
            = useGetTasksQuery(
            {
                todoId,
                pageSize,
                page,
            },

        )



    useEffect(() => {
        if (getTotalCount) {
            dispatch(setTotalCount({totalCount}))
        }

        if (data) {
            dispatch(setTask({todoId, tasks: data.items}))
        }


    }, [data, isFetching])


    const tasks = data && data.items
    const getTotalCount = data ? data.totalCount : 5
    const pages = getTotalCount && Math.ceil(getTotalCount / pageSize)


    const changePageHandler = (page: number) => {
        dispatch(changePage({page, pageSize}));
    }




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
                return task?.filter(task => task.status !== Status.New)
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
        setPriority,
        setCurrentTask,
        changePageHandler,

    }
}
