import React, {ChangeEvent, useState} from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {AddInputForm} from "../common/AddInputForm/AddInputForm";
import {Modal} from "../common/Modal/Modal";
import {useCreateTodoMutation} from "../../Dall/api";
import {useAppDispatch} from "../hook/hooks";
import {resetTaskPageSetting, setPageSettings} from "../../redux/Slices/paginatorSlice";


type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type SideBarPropsType = {
    todos?: TodolistType[]
}
export const SideBar = ({todos}: SideBarPropsType) => {
    const dispatch = useAppDispatch()
    const [activeModal, setActiveModal] = useState(false)
    const [createTodo] = useCreateTodoMutation()
    const linkOnclickHandler = (event:any) =>{
        dispatch(resetTaskPageSetting())
    }


    const linkTodos = todos && todos.map(t =>
        <NavLink
            style={({isActive}) => {
                return {
                    color: isActive ? '#FFA07A' : 'white',
                    textDecoration: 'none',
                    fontSize: '20px',
                    fontWeight: '700'
                }
            }}
            onClick={linkOnclickHandler}
            key={t.id}
            to={`/todos/${t.id}`}>
            <li>{t.title}</li>
        </NavLink>
    )

    const onClilHandlerCreateTodo = () => {
        setActiveModal(true)
    }

    const addTodolistHandler = (text: string) => {
        createTodo(text)
    }


    return (
        <SideBarContainer>
            <SideBarTitleContainer>
                <Title>MY TODOS</Title>
                <button onClick={onClilHandlerCreateTodo}>create Todo</button>
            </SideBarTitleContainer>
            <LinkList>
                {linkTodos}
            </LinkList>
            <Modal title={'Create Todo'} active={activeModal} setActive={setActiveModal}>
                <AddInputForm onClick={addTodolistHandler}/>
            </Modal>

        </SideBarContainer>
    )
};

const SideBarTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`


const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(203, 199, 199, 0.15);
  min-height: 80vh;
  min-width: 15vw;
  padding: 10px;
  border-radius: 10px;
`
const Title = styled.h2`
  color: white;
`

const LinkList = styled.ul`
  text-transform: uppercase;
  list-style-type: none;
`

const LiStyle = styled.li`
  text-decoration: none;
  color: white;

`