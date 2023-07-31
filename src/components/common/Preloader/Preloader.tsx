import React from 'react';
import preloader from '../../../assets/preloader/Ellipsis-3.4s-200px.svg'
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
  position: absolute;
  top:20px;
  left: 0;
  width: 100vw;
  
  & img {
    width: 50px;
    height: 50px;
  }
`
