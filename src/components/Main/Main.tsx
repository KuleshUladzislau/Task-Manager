import {SideBar} from "../SideBar/SideBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Todolist} from "../TodoList/Todolist";
import React, {useEffect} from "react";
import styled from "styled-components";
import {useGetAllTodosQuery} from "../../Dall/api";


export const Main = React.memo(() => {
    const {data, isSuccess} = useGetAllTodosQuery()


    const nagivate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            data && nagivate(`/todos/${data[0]?.id}`)
        }
    }, [isSuccess])


    const todos = data?.map(tod =>
        <Route key={tod.id} path={`/todos/${tod.id}`}
               element={<Todolist key={tod.id} title={tod.title} id={tod.id}/>}>
        </Route>
    )

    return (
        <MainContainer>
            <SiteBarContainer>
                <SideBar todos={data}/>
            </SiteBarContainer>
            <Content>
                <Routes>
                    {todos}
                </Routes>
            </Content>
        </MainContainer>
    )
})
const MainContainer = styled.div`
  display: flex;
  padding: 10px;

`

const SiteBarContainer = styled.div`
  flex-grow: 1;
  flex: 20%;
  border-radius: 10px;

`

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 2;
  flex: 80%;
`