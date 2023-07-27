import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";


export type AddInputFormPropsType = {
    onClick: (text: string) => void

}

export const AddInputForm = (props: AddInputFormPropsType) => {

    let {onClick} = props

    const [text, setText] = useState('')
    const [error, setError] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setText(e.currentTarget.value)
    }
    const onClickHandler = () => {
        if (text.length !== 0) {
            onClick(text)
            setText('')
            setError('')

        }
        setError('Field must be filled ')

    }

    const onBlurHandler = () => {
        if (text.length === 0) {
            return setError('Field must be filled ')
        }
        onClick(text)
        setText('')


    }


    return (
        <AddInputFormContainer>
            <InputAddForm name='addInputForm'
                          type="text"
                          value={text}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
            />
            <Button onClick={onClickHandler}>ADD</Button>

            {error && <div>{error}</div>}
        </AddInputFormContainer>
    );
}

const AddInputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const InputAddForm = styled.input`
  margin-top: 40px;
  margin-bottom: 15px;
  padding: 5px;
  border: none;
  border-bottom: 2px solid palevioletred;
  outline: none;
  font-size: 14px;
  font-size: 20px;
  color: white;

  &:not(:focus) {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`



const Button = styled.button`
  background: linear-gradient(to right, rgba(255, 165, 0, 0.55), #FF69B4);
  color: white;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 10px;
`



