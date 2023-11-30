import {SideBar} from "../SideBar/SideBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Todolist} from "../TodoList/Todolist";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useGetAllTodosQuery} from "../../services/api";


export const Main = React.memo(() => {
    const {data, isSuccess} = useGetAllTodosQuery()

    const [openMenu, setOpenMenu] = useState<boolean>(false)


    const nagivate = useNavigate()

    useEffect(() => {
        if (data) {
            data && nagivate(`/todos/${data[0]?.id}`)
        }
    }, [data])


    const todos = data?.map(tod =>
        <Route key={tod.id} path={`/todos/${tod.id}`}
               element={<Todolist key={tod.id} title={tod.title} id={tod.id}/>}>
        </Route>
    )

    const onOpenMenuHandler = () => setOpenMenu(!openMenu)


    return (
        <MainContainer>
            <SiteBarContainer>
                <SideBar todos={data}/>
            </SiteBarContainer>
            <SideBarMobileContainer  visible={openMenu}>
                <SideBar todos={data}/>
            </SideBarMobileContainer>
            <SideBarMobile rotate={openMenu} onClick={onOpenMenuHandler}/>
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
  
  @media (max-width: 900px) {
    padding: 0;
  }

`

const SiteBarContainer = styled.div`
  flex-grow: 1;
  flex: 20%;
  border-radius: 10px;
 

  @media (max-width: 900px) {
    display: none;

   
  }

`

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 2;
  flex: 80%;
`
const SideBarMobile = styled.div<ArrowProps>`
  @media(max-width: 900px){
    display: block;
    position: fixed;
    top: 50%;
    left: ${(props)=>(!props.rotate ? '0px' : '10px')};
    width: 15px;
    height: 15px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: ${(props)=>(!props.rotate ? 'rotate(45deg)' : 'rotate(225deg)')};
    z-index: 4 ;
  }
 
`

const SideBarMobileContainer = styled.div<SideBarMobileProps>`
  display: none;
  @media(max-width: 900px){
    display: ${(props) => (props.visible ? 'block' : 'none')};
    z-index: 3;
    width: 10%;
    height: 100%;
  }
  
`;



type SideBarMobileProps = {
    visible:boolean
}
type ArrowProps = {
    rotate:boolean
}
