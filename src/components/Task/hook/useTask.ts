import {useRemoveTaskMutation, useReorderTaskMutation, useUpdateTaskMutation} from "../../../Dall/api";
import {useState} from "react";


export const useTask = (todoListId:string,taskId:string) => {
    const [reorderTask] = useReorderTaskMutation()
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [disabledCompleted, setDisabledCompleted] = useState(false)

    return {
        disabledCompleted,
        removeTask,
        setDisabledCompleted,
        reorderTask,
        updateTask
    }
}