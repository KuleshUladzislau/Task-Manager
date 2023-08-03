import React, {ReactNode} from 'react';

import styled from "styled-components";
import {Task} from "../Task/Task";
import {Pages} from "../common/Paginator/Pages";
import {Priority} from "../Task/hook/useTasks";

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type PriorityType = 'high' | 'middle' | 'low' | 'all'|'completed'

type TasksPriorityType = {
    tasks?: TaskType[]
    priority: PriorityType
    setCurrentTask: (value: string) => void
    currentTaskId: string
    isFetching: boolean
    pageSize: number
    page: number
}
export const TasksPriority = (props: TasksPriorityType) => {

    const
        {
            tasks,
            priority,
            setCurrentTask,
            isFetching,
            currentTaskId,
            pageSize,
            page
        }
            = props


    const filteredTasks =
        tasks?.map(el =>
            <Task
                key={el.id}
                description={el.description}
                title={el.title}
                status={el.status}
                priority={el.priority}
                startDate={el.startDate}
                deadline={el.deadline}
                id={el.id}
                todoListId={el.todoListId}
                order={el.order}
                addedDate={el.addedDate}
                currentTask={currentTaskId}
                setCurrentTask={setCurrentTask}
                isFetching={isFetching}
            />
        )

    const priorityStyle =
        priority === 'high' ? 'red'
            : priority === 'middle' ? 'orange'
                : priority === 'low' ? 'skyblue' : ''


    return (
        <TaskPriorityContainer border={priorityStyle}>
            <TaskContainer>
                {filteredTasks}
            </TaskContainer>
            <Pages pageSize={3} currentPage={1}/>
        </TaskPriorityContainer>
    );
};

export default TasksPriority;

interface TaskPriorityStylePros {
    border: string
}

const TaskPriorityContainer = styled.div<TaskPriorityStylePros>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75vw;
  border-radius: 20px;
`
// 5px solid yellow
const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 20px;

`

const ArrowStyleRight = styled.div`
  border: solid white;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(-45deg);

  &:hover {
    border: solid #e7b263;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(-45deg);
  }
`;

export const ArrowStyleLeft = styled.div`
  border: solid white;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(135deg);

  &:hover {
    border: solid #e7b263;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(135deg);

  }
`