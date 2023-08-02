import React, {ReactNode} from 'react';

import styled from "styled-components";
import {Task} from "../Task/Task";
import {Pages} from "../common/Paginator/Pages";

type TaskType = {
    description: string
    title: string
    status: number
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TasksPriorityType = {
    tasks: TaskType[]
}
export const TasksPriority = (props: TasksPriorityType) => {

    const {tasks} = props

    const currentTask = ''
    const setCurrentTask = () => {
    }
    const isFetching = false


    const filteredTasks = tasks?.map((el: any) =>
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
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            isFetching={isFetching}
        />
    )

    return (
        <TaskPriorityContainer>
            <TaskContainer>
                {filteredTasks}
            </TaskContainer>
            <Pages pageSize={3} currentPage={1}/>
        </TaskPriorityContainer>
    );
};

export default TasksPriority;

const TaskPriorityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  padding: 20px;
  border-radius: 20px;
  border: 5px solid yellow;

`

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 20px;
  padding: 20px;
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