import {useRemoveTaskMutation, useReorderTaskMutation, useUpdateTaskMutation} from "../../../Dall/api";
import {useState} from "react";
import {Status} from "./useTasks";
import {TaskPropsType} from "../Task";


export const useTask =
    (
        todoListId: string,
        taskId: string,
        TaskProps: TaskPropsType,
    ) => {


        const [reorderTask] = useReorderTaskMutation()
        const [removeTask] = useRemoveTaskMutation()
        const [updateTask] = useUpdateTaskMutation()
        const [disabledCompleted, setDisabledCompleted] = useState(false)
        const [priorityMode, setPriorityMode] = useState(true)
        const
            {
                setCurrentTask,
                currentTask,
                priority,
                status,
                title,
                deadline,
                description,
                startDate
            } = TaskProps

        const taskForUpdate =
            {
                status,
                todoListId,
                deadline,
                description,
                priority,
                startDate,
                title
            }

        const priorityColor =
            priority === 0 ? 'red'
                : priority === 1 ? 'skyBlue'
                    : priority === 2 ? 'yellow'
                        : priority === 3 ? 'violet'
                            : priority === 4 ? 'orange' : ''


        let removeTaskHandler = () => removeTask({todoListId, taskId})

        let newStatus = status === Status.Completed ? Status.New : Status.Completed
        const changeTaskTitle = (title: string) => updateTask({todoListId, taskId, item: {...taskForUpdate, title}})

        const changeTaskStatus = () => {
            setDisabledCompleted(true)
            updateTask({todoListId, taskId, item: {...taskForUpdate, status: newStatus}})
                .finally(() => setDisabledCompleted(false))
        }

        const changePriority = (priority: number) => updateTask({
            todoListId,
            taskId,
            item: {...taskForUpdate, priority}
        })
        const changePriorityValue = () => setPriorityMode(!priorityMode)


        const dragStarHandler = () => setCurrentTask(taskId)

        const reorderHandler = () => reorderTask({todoListId, taskId: currentTask, putAfterItemId: taskId})


        return {
            priorityColor,
            disabledCompleted,
            priorityMode,
            changePriorityValue,
            dragStarHandler,
            changePriority,
            changeTaskStatus,
            removeTaskHandler,
            removeTask,
            setDisabledCompleted,
            reorderHandler,
            changeTaskTitle
        }
    }