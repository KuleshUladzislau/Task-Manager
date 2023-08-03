import React, {ChangeEvent, useState} from 'react';
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {useTodoList} from "./hook/useTodoList";
import styled from "styled-components";
import {AddInputForm} from "../common/AddInputForm/AddInputForm";
import {Modal} from "../common/Modal/Modal";
import {PriorityType, useTasks} from "../Task/hook/useTasks";
import {Preloader} from "../common/Preloader/Preloader";
import TasksPriority from "../TasksPriority/TasksPriority";
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
        setLow,
        setMiddle,
        setHigh,
        setPriority,
        changePageHandler,
        filteredTasks,
        isError

    } = useTasks(id)

    const [select,setSelect] = useState<PriorityType>('middle')
    const onChangeHandler = (value:string)=>{

        setPriority(value as PriorityType)
    }

    // const visibleArrowLeft = !viewTasks && filter === 'all' && page > 1
    // const visibleArrowRight = !viewTasks && filter === 'all' && page < pages
    // const visiblePages = !viewTasks && filter === 'all'

    const options:PriorityType[] = ['all',"high",'middle',"low",'completed',]

    return (
        <TodolistContainer>
            <TitleContainer>
                <TodoTitle><EditableSpan title={title} onChange={changeTodoTitle}/></TodoTitle>

                <div style={{border:'1px solid red',padding:'10px'}}>
                    Tasks Settings
                    <Select onChange={onChangeHandler} options={options}/>
                </div>
                <img src={deleteIcon} alt="" onClick={removeTodoHandler}/>
            </TitleContainer>
            {isFetching && <Preloader/>}
            <ButtonCreateTask onClick={createTaskHandler}>Add Task</ButtonCreateTask>
                <TasksPriority
                    tasks={filteredTasks}
                    priority={priority}
                    setCurrentTask={setCurrentTask}
                    currentTaskId={currentTask}
                    isFetching={isFetching}
                    pageSize={25}
                    page={5}/>
            {/*    {visibleArrowLeft && <ArrowStyleLeft onClick={() => changePageHandler(page - 1)}/>}*/}
            {/*    {!viewTasks ? filteredTasks : <Preloader/>}*/}
            {/*    {visibleArrowRight && <ArrowStyleRight onClick={() => changePageHandler(page + 1)}/>}*/}




            {/*{visiblePages && <Pages pageSize={25} allPage={0} currentPage={1}/>}*/}
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
  cursor: pointer;
  
`

