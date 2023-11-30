import React from 'react';
import styled from "styled-components";
import {useLogoutMutation, useMeQuery} from "../../services/api";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hook/hooks";
import {setAuthorized} from "../../redux/Slices/authSlice";


export const Header = () => {

    const login = useMeQuery().data?.data.login
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const onClick = () => {
        logout()
        dispatch(setAuthorized({isAuth: false}))
        navigate('/login')
    }


    return (
        <ContainerHeader>
            <TitleLogin>{login}</TitleLogin>
            <ButtonLogout onClick={onClick}>logout</ButtonLogout>
        </ContainerHeader>
    );
};


const ContainerHeader = styled.div`
  display: flex;

  justify-content: space-between;
  background: rgba(203, 199, 199, 0.15);
  align-items: center;
  border-radius: 10px;
  width: 97vw;
  margin: 10px 0 10px 10px;

  @media (max-width: 900px) {

    width: 100%;
    border-radius: 0;
    margin: 0;
  }

`

const ButtonLogout = styled.button`
  margin-right: 20px;
  background: transparent;
  text-transform: capitalize;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  border: none;
  color: white;
  font-size: 20px;
`

const TitleLogin = styled.h2`
  color: white;
  margin-left: 20px;
`

