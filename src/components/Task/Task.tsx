import React, {ChangeEvent, DragEvent, useState} from 'react';
import styled from "styled-components";
import {useTask} from "./hook/useTask";
import {TaskPriorityMenu} from "./TaskPriorityMenu/TaskPriorityMenu";
import {TaskMain} from "./TaskMain/TaskMain";
import {Status} from "./hook/useTasks";


export type TaskPropsType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string,
    currentTask: string,
    setCurrentTask: (id: string) => void
    isFetching: boolean
}

export const Task = (props: TaskPropsType) => {
    const
        {
            title,
            todoListId,
            id,
            priority,
            status,
            ...restProps

        }
            = props

    const priorityColor =
        priority === 0 ? 'red'
            : priority === 1 ? 'orange'
                : priority === 2 ? 'skyBlue' : ''




    const priorityTitle =
        priority === 0 ? 'high'
            : priority === 1 ? 'middle'
                : priority === 2 ? 'low' : 'change'

    const statusStyle = status !== Status.Completed ? priorityColor : 'yellowGreen'
    const completedTitle = status === Status.Completed ? `${priorityTitle}/completed` : priorityTitle


    const {
        disabledCompleted,
        priorityMode,
        changePriorityMode,
        changePriority,
        changeTaskStatus,
        reorderHandler,
        removeTaskHandler,
        changeTaskTitle,
        dragStarHandler
    }
        = useTask
    (
        todoListId,
        id,
        {...props}
    )


    return priorityMode
        ? <TaskMain
            priorityTitle={completedTitle}
            priorityColor={statusStyle}
            dragStarHandler={dragStarHandler}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            disabledCompleted={disabledCompleted}
            removeTaskHandler={removeTaskHandler}
            reorderTask={reorderHandler}
            changePriorityMode={changePriorityMode}
            title={title}
        />
        : <TaskPriorityMenu
            priorityTitle={priorityTitle}
            priorityColor={priorityColor}
            priority={priority}
            changePriorityMode={changePriorityMode}
            changePriority={changePriority}
        />


}


export const TaskStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 200px;
  min-height: 285px;
  background: rgba(203, 199, 199, 0.15);
  margin: 10px;
  border-radius: 10px;
  overflow-wrap: break-word;
`


interface PriorityPropsType {
    background: string
}

export const PriorityStyle = styled.div<PriorityPropsType>`
  background: ${props => props.background};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
`


