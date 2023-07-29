import React, {DragEvent} from 'react';
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import deleteIcon from '../../assets/img/delete icon/TaskDelete/deleted.png'
import styled from "styled-components";
import {useRemoveTaskMutation, useReorderTaskMutation, useUpdateTaskMutation} from "../../Dall/api";
import {Status} from "./hook/useTasks";



export type TaskPropsType = {
    description: string
    title: string
    status: number
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string,
    currentTask:string,
    setCurrentTask:(id:string)=>void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {
        title,
        status,
        todoListId,
        id,
        deadline,
        description,
        priority,
        startDate,
        setCurrentTask,
        currentTask
    } = props

    const activeTaskStyle = status === 1 ? '1px solid greenyellow' : ''
    const [reorderTask] = useReorderTaskMutation()
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const changeTaskTitle = (title: string) => {
        let newPost = {status, todoListId, deadline,
            description, priority, startDate,}
        updateTask({todoListId, taskId: id, item: {...newPost, title}})
    }
    const changeTaskStatus = () => {
        let newStatus = status === Status.Completed ? Status.New : Status.Completed
        updateTask({todoListId, taskId: id, item: {...props, status: newStatus}})
    }

    const dragStarHandler = (e: DragEvent<HTMLDivElement>, el:TaskPropsType) => {
        setCurrentTask(el.id)
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const onDropHandler = (e: DragEvent<HTMLDivElement>, el:TaskPropsType) => {
        reorderTask({todoListId,taskId:currentTask,putAfterItemId:el.id})
    }

    let removeTaskHandler = () => {
        removeTask({todoListId, taskId: id})
    }

    return (
        <TaskStyle border={activeTaskStyle}
                   onDragStart={(e: DragEvent<HTMLDivElement>) => dragStarHandler(e, {...props})}
                   onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                   onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                   onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                   onDrop={(e: DragEvent<HTMLDivElement>) => onDropHandler(e, {...props})}
                   draggable={true}
        >
            <ButtonWrapper>
                <Button onClick={removeTaskHandler}>
                    <img src={deleteIcon} alt="x"/>
                </Button>
            </ButtonWrapper>
            <h3 style={{color: 'white'}}>Task</h3>
            <TaskTitle>
                <EditableSpan title={title} onChange={changeTaskTitle}/>
            </TaskTitle>
            <ButtonCompleted onClick={changeTaskStatus}>Completed</ButtonCompleted>
        </TaskStyle>
    );
})

interface TaskStyleProps {
    border: string
}

const TaskStyle = styled.div<TaskStyleProps>`
  text-align: center;
  width: 200px;
  min-height: 200px;
  background: rgba(203, 199, 199, 0.15);
  border: ${props => props.border};
  margin: 10px;
  border-radius: 10px;
  overflow-wrap: break-word;

`

const TaskTitle = styled.span`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10px;
  min-height: 100px;


`


const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
`
const ButtonWrapper = styled.div`
  position: relative;

`
const ButtonCompleted = styled.button`
  background: transparent;
  text-transform: uppercase;
  border: none;
  padding: 5px;
  background: linear-gradient(to right, rgba(255, 165, 0, 0.55), #FF69B4);
  border-radius: 10px;
  color: white;
  margin: 20px;
`

