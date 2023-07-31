import {
    useChangeTodoTitleMutation,
    useCreateTaskMutation,
    useRemoveTodoMutation
} from "../../../Dall/api";


export const useTodoList = (todolistId: string) => {

    const [removeTodo] = useRemoveTodoMutation()
    const [changeTodoTile] = useChangeTodoTitleMutation()
    const [createTask] = useCreateTaskMutation()


    const removeTodoHandler = () => {
        removeTodo(`${todolistId}`)
    }
    const addTaskHandler = (title: string) => {
        createTask({todolistId, title})
    }
    const changeTodoTitle = (title: string) => {
        changeTodoTile({todolistId, title})
    }





    return {
        removeTodoHandler,
        changeTodoTitle,
        addTaskHandler,
    }
}