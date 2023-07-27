import React from 'react';
import preloader from '../../../assets/preloader/Spinner-1s-200px.svg'
import styled from "styled-components";

export const Preloader = () => {
    return (
        <PreloaderStyle>
            <img src={preloader} alt=""/>
        </PreloaderStyle>)
};

const PreloaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  
  height: 100vh;
  width: 100vw;
 
  & img {
    width: 300px;
    height: 300px;
  }
`
