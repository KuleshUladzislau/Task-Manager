import {useRemoveTaskMutation, useReorderTaskMutation, useUpdateTaskMutation} from "../../../Dall/api";
import {DragEvent, useState} from "react";
import {TaskChange} from "../../../Dall/apiTypes";
import {Status} from "./useTasks";


export const useTask = (
    todoListId: string,
    taskId: string,
    taskForUpdate: TaskChange,
    title: string,
    status: number
) => {


    const [reorderTask] = useReorderTaskMutation()
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [disabledCompleted, setDisabledCompleted] = useState(false)
    let removeTaskHandler = () => removeTask({todoListId, taskId})
    let newStatus = status === Status.Completed ? Status.New : Status.Completed


    const changeTaskTitle = (title: string) => updateTask({todoListId, taskId, item: {...taskForUpdate, title}})

    const changeTaskStatus = () => {
        setDisabledCompleted(true)
        updateTask({todoListId, taskId, item: {...taskForUpdate, status: newStatus}})
            .finally(() => setDisabledCompleted(false))
    }


    return {
        disabledCompleted,
        changeTaskStatus,
        removeTaskHandler,
        removeTask,
        setDisabledCompleted,
        reorderTask,
        changeTaskTitle
    }
}