import React, {ReactNode} from 'react';

import styled from "styled-components";
import {Task} from "../Task/Task";

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
    viewTasks:boolean
    filter:string
    page:number
    pages:number
    tasks:TaskType[]
    changePageHandler:(page:number)=>void
    pageSize:number
    currentTask: string
    setCurrentTask: (id: string) => void
    isFetching: boolean

}
const TasksPriority = () => {

   const tasks:TaskType[] = []

    const currentTask = ''
    const setCurrentTask = ()=>{}
    const isFetching = false



    const filteredTasks = tasks?.map(el =>

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

            <TaskContainer >
                {/*{visibleArrowLeft && <ArrowStyleLeft onClick={() => changePageHandler(page - 1)}/>}*/}
                {filteredTasks}
                asdf
                {/*{visibleArrowRight && <ArrowStyleRight onClick={() => changePageHandler(page + 1)}/>}*/}
            </TaskContainer>


    );
};

export default TasksPriority;

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
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