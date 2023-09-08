import React, {ChangeEvent, useState} from 'react';
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {useTodoList} from "./hook/useTodoList";
import styled from "styled-components";
import {AddInputForm} from "../common/AddInputForm/AddInputForm";
import {Modal} from "../common/Modal/Modal";
import {PriorityType, useTasks} from "../Task/hook/useTasks";
import {Preloader} from "../common/Preloader/Preloader";
import Tasks from "../Tasks/Tasks";
import deleteIcon from '../../assets/img/delete icon/TodosDelete/cross.png'
import {Select} from "../common/Select/Select";


export type TodolistPropsType = {
    title: string
    id: string
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const {title, id} = props
    const [activeModal, setActiveModal] = useState(false)
    const createTaskHandler = () => setActiveModal(true)


    const {
        removeTodoHandler,
        changeTodoTitle,
        addTaskHandler,
    } = useTodoList(id)

    const {
        pages,
        page,
        pageSize,
        priority,
        currentTask,
        isFetching,
        viewTasks,
        setCurrentTask,
        setPriority,
        changePageHandler,
        filteredTasks,
    } = useTasks(id)


    const onChangeHandler = (value: string) => {

        setPriority(value as PriorityType)
    }


    const options: PriorityType[] = ['all', "high", 'middle', "low", 'completed',]

    return (
        <TodolistContainer>
            <TitleContainer>
                <TodoTitle><EditableSpan title={title} onChange={changeTodoTitle}/></TodoTitle>
                <TaskSettings>
                    Tasks Settings :
                    <Select onChange={onChangeHandler} options={options}/>
                </TaskSettings>
                <img src={deleteIcon} alt="" onClick={removeTodoHandler}/>
            </TitleContainer>
            {isFetching && <Preloader/>}
            <ButtonCreateTask onClick={createTaskHandler}>Add Task</ButtonCreateTask>
            <Tasks
                changePage={changePageHandler}
                tasks={filteredTasks}
                priority={priority}
                setCurrentTask={setCurrentTask}
                currentTaskId={currentTask}
                isFetching={isFetching}
                pageSize={pageSize}
                page={page}
                allPage={pages}
            />
            <Modal title={'Create Task'} active={activeModal} setActive={setActiveModal}>
                <AddInputForm onClick={addTaskHandler}/>
            </Modal>
        </TodolistContainer>
    )


})


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 30px;
  gap: 150px;
  margin-bottom: 50px;
`

const FilterButton = styled.button`
  display: flex;
  border: none;
  background: transparent;
  text-transform: uppercase;
  font-size: 20px;
  color: ${props => props.color};

  &:hover {
    color: orange;
  }
`

const TodoTitle = styled.h2`
  margin: 20px;
  color: white;
`

export const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const TodolistContainer = styled.div`
  margin-left: 30px;
`


const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  border-bottom: 5px solid rgba(203, 199, 199, 0.15);
`

export const ArrowStyleRight = styled.div`
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

const ButtonCreateTask = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  width: 200px;
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin-left: 40px;
  margin-top: 10px;
  cursor: pointer;

`

const TaskSettings = styled.div`
  color: orange;
  font-weight: 500;
  font-size: 20px;
`

