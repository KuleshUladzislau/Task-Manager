import React from "react";
import styled from "styled-components";

type ButtonPropsType = {
    disabled: boolean
    onClick: () => void
    title: string
}

export const UniversalButton = (props: ButtonPropsType) => {
    const
        {
            title,
            onClick,
            disabled
        }
            = props

    const onClickHandler = () =>  onClick()

    return <ButtonCompleted disabled={disabled} onClick={onClickHandler}>{title}</ButtonCompleted>
}

const ButtonCompleted = styled.button`
  background: transparent;
  text-transform: uppercase;
  border: none;
  padding: 10px;
  background: linear-gradient(to right, rgba(255, 165, 0, 1), #FF69B4);
  border-radius: 25px;
  color: white;
  margin: 20px;

  &:hover {
    background: linear-gradient(to right, rgba(255, 165, 0, 0.5), #FF69B4);
  }

  &:disabled {
    background: linear-gradient(to right, rgba(255, 165, 0, 0), #FF69B4);
  }
`