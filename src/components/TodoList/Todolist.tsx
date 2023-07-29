import React, {useState} from 'react';
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {useTodoList} from "./hook/useTodoList";
import styled from "styled-components";
import {AddInputForm} from "../common/AddInputForm/AddInputForm";
import {Modal} from "../common/Modal/Modal";
import {useTasks} from "../Task/hook/useTasks";
import {Task} from "../Task/Task";
import {Pages} from "../common/Paginator/Pages";
import todoDeleteIcon from '../../assets/img/delete icon/TodosDelete/cross.png'



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
        filteredTask,
        pages,
        page,
        pageSize,
        isLoading,
        filter,
        currentTask,
        setCurrentTask,
        changePageHandler,
        setAll,
        setActive,
        setDone
    } = useTasks(id)


    const filteredTasks = filteredTask?.map(el =>
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
        />
    )


    return (
        <TodolistContainer>
            <TitleContainer>
                <TodoTitle><EditableSpan title={title} onChange={changeTodoTitle}/></TodoTitle>
                <img src={todoDeleteIcon} alt="" onClick={removeTodoHandler}/>
            </TitleContainer>
            <ButtonCreateTask onClick={createTaskHandler}>Add Task</ButtonCreateTask>
            <ButtonContainer>
                <FilterButton color={filter === 'all' ? 'orange' : 'white'} onClick={setAll}>all</FilterButton>
                <FilterButton color={filter === 'active' ? 'orange' : 'white'} onClick={setActive}>active</FilterButton>
                <FilterButton color={filter === 'done' ? 'orange' : 'white'} onClick={setDone}>completed</FilterButton>
            </ButtonContainer>
            {filter === 'all' && <Pages pageSize={pageSize} allPage={pages} currentPage={page}/>}
            <TaskContainer>
                {filter === 'all' && page > 1 && <ArrowStyleLeft onClick={(e: any) => changePageHandler(page - 1, e)}/>}
                {isLoading ? <p>...loadind</p> : filteredTasks}
                {filter === 'all' && page < pages &&
                    <ArrowStyleRight onClick={(e: any) => changePageHandler(page + 1, e)}/>}
            </TaskContainer>
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
  margin-left: 60px;
  height: 30px;
  gap: 90px;
`

const FilterButton = styled.button`
  border: none;
  background: transparent;
  text-transform: uppercase;
  font-size: 20px;
  color: ${props => props.color};
  margin-top: 20px;

  &:hover {
    color: orange;
  }
`

const TodoTitle = styled.h2`
  margin: 20px;
  color: white;
`

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

`

const TodolistContainer = styled.div`
  min-width: 80vw;
  margin-left: 10px;
`


const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
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

const ArrowStyleLeft = styled.div`
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
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin-left: 40px;
`