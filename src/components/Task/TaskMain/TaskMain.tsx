import React, {DragEvent} from 'react';
import deleteIcon from "../../../assets/img/delete icon/TaskDelete/deleted.png";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {UniversalButton} from "../../common/UniversalButton/UniversalButton";
import {PriorityStyle, TaskStyle} from "../Task";
import styled from "styled-components";

export type TaskMainPropsType = {
    disabledCompleted: boolean
    changeTaskStatus: () => void
    reorderTask: () => void
    removeTaskHandler: () => void
    changeTaskTitle: (title: string) => void
    priorityColor: string
    changePriorityValue: () => void
    title: string
    dragStarHandler: () => void
}
export const TaskMain = (props: TaskMainPropsType) => {
    const
        {
            reorderTask,
            changeTaskStatus,
            removeTaskHandler,
            changeTaskTitle,
            disabledCompleted,
            priorityColor,
            changePriorityValue,
            title,
            dragStarHandler
        }
            = props


    const dragStarHand = () => dragStarHandler()
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => e.preventDefault()
    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => e.preventDefault()
    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => e.preventDefault()
    const onDropHandler = () => reorderTask()

    return (
        <TaskStyle
            onDragStart={dragStarHand}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDrop={onDropHandler}
            draggable={true}
        >
            <PriorityStyle background={`${priorityColor}`} onClick={changePriorityValue}>priority</PriorityStyle>
            <ButtonWrapper>
                <Button onClick={removeTaskHandler}>
                    <img src={deleteIcon} alt="x"/>
                </Button>
            </ButtonWrapper>
            <h3 style={{color: 'white'}}>Task</h3>
            <TaskTitle>
                <EditableSpan title={title} onChange={changeTaskTitle}/>
            </TaskTitle>
            <UniversalButton onClick={changeTaskStatus} title='completed' disabled={disabledCompleted}/>
        </TaskStyle>
    );
};

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