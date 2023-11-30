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
import {Select} from "antd";


export type TodolistPropsType = {
    title: string
    id: string
}

export const Todolist = (props: TodolistPropsType) => {
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
        setCurrentTask,
        setPriority,
        changePageHandler,
        filteredTasks,
    } = useTasks(id)


    const onChangeHandler = (value: string) => {

        setPriority(value as PriorityType)
    }


    const options = [
        {value: 'all', label: 'all'},
        {value: 'high', label: 'high'},
        {value: 'middle', label: 'middle'},
        {value: 'low', label: 'low'},
        {value: 'completed', label: 'completed'},
    ]


    return (
        <TodolistContainer>
            <TitleContainer>
                <TodoTitle><EditableSpan title={title} onChange={changeTodoTitle}/></TodoTitle>
                <TaskSettings>
                    Tasks Settings :
                    <Select options={options} defaultValue={'all'} onChange={onChangeHandler} style={{width:'100px',marginLeft:'10px'}}/>
                </TaskSettings>
                <DeleteImg src={deleteIcon} alt="" onClick={removeTodoHandler}/>
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


}




const TodoTitle = styled.h2`
  margin: 20px;
  color: white;
`



const TodolistContainer = styled.div`
  margin-left: 30px;
  @media(max-width:900px){
    margin-left: 0;
    padding-top: 20px;
  }
`


const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  border-bottom: 5px solid rgba(203, 199, 199, 0.15);
  @media (max-width: 900px){
    display: flex;
    flex-direction: column-reverse;
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
  @media(max-width: 900px){
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
  }
`

const DeleteImg = styled.img `
    
    @media(max-width: 900px){
      position: absolute;
      top: 95px;
      right: 20px;
    }
`
