import React, {useEffect, useState} from 'react';
import './App.module.css';
import {Login} from "./components/Login/Login";
import {Route, Routes, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Main} from "./components/Main/Main";
import {Header} from "./components/Header/Header";
import { useMeQuery} from "./Dall/api";
import {ResultCode} from "./Dall/apiTypes";
import {useAppDispatch, useAppSelector} from "./components/hook/hooks";
import {setAuthorized} from "./redux/Slices/authSlice";
import {Preloader} from "./components/common/Preloader/Preloader";


function App() {


    const {data, isFetching, isLoading,isSuccess} = useMeQuery()
    const isAuthorized = data?.resultCode
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (isAuthorized === ResultCode.Success) {
            navigate('/')
            dispatch(setAuthorized({isAuth: true}))
        } else {
            navigate('/login')
        }
    }, [data])

    if (isLoading) {
        return  <Preloader/>
    }


    return (
        <AppWrapper>
            {isAuth && <Header/>}
            <AppContainer>
                <Routes>
                    <Route  path={'*'} element={<Main/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </AppContainer>
        </AppWrapper>

    );
}

export default App;


const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  box-sizing: border-box;
`

const AppContainer = styled.div`
  display: flex;
  align-items: center;
`


