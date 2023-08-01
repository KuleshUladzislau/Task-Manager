import React, {ChangeEvent, DragEvent, useState} from 'react';
import styled from "styled-components";
import {useTask} from "./hook/useTask";
import {TaskPriorityMenu} from "./TaskPriorityMenu/TaskPriorityMenu";
import {TaskMain} from "./TaskMain/TaskMain";


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
            ...restProps

        }
            = props
    const priorityColor =
        priority === 0 ? 'red'
            : priority === 1 ? 'yellow'
                : priority === 2 ? 'orange'
                    : priority === 3 ? 'violet'
                        : priority === 4 ? 'skyBlue' : ''


    const
        {
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
            priorityColor={priorityColor}
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
            priorityColor={priorityColor}
            priority={priority}
            changePriorityMode={changePriorityMode}
            changePriority={changePriority}
        />


}


export const TaskStyle = styled.div`
  text-align: center;
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
  margin-left: -1px;
  margin-top: -1px;
  width: 101%;
  text-align: center;
`


