import React, {ReactNode} from 'react';

import styled from "styled-components";
import {Task} from "../Task/Task";
import {Pages} from "../common/Paginator/Pages";
import {Priority} from "../Task/hook/useTasks";
import arrowRight from "../../assets/img/arrow/free-icon-arrow-right-5093097.png";

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


type PriorityType = 'high' | 'middle' | 'low' | 'all' | 'completed'

type TasksPriorityType = {
    tasks?: TaskType[]
    priority: PriorityType
    setCurrentTask: (value: string) => void
    currentTaskId: string
    isFetching: boolean
    pageSize: number
    page: number
    allPage: number
    changePage: (page: number) => void
}
export const Tasks = (props: TasksPriorityType) => {

    const
        {
            tasks,
            priority,
            allPage,
            isFetching,
            currentTaskId,
            pageSize,
            page,
            setCurrentTask,
            changePage
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
                {filteredTasks?.length === 0
                    ?
                    <CreateTask>Create Task</CreateTask>

                    : filteredTasks}
            </TaskContainer>
            <Pages pageSize={pageSize} currentPage={page} allPage={allPage}/>
            <div style={{display: 'flex', alignItems: 'center', marginTop: '30px'}}>
                {page > 1 &&
                    <img src={arrowRight} style={{transform: 'rotate(180deg)'}} onClick={() => changePage(page - 1)}/>}
                {page < allPage && <img src={arrowRight} onClick={() => changePage(page + 1)}/>}
            </div>
        </TaskPriorityContainer>
    );
};

export default Tasks;

interface TaskPriorityStylePros {
    border: string
}

const TaskPriorityContainer = styled.div<TaskPriorityStylePros>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  border-radius: 20px;
`
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

const CreateTask = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  width: 100%;
  border: 1px solid red;
`