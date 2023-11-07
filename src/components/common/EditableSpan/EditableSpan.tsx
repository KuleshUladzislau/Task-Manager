import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";



export type EditableSpanPropsType = {
    title: string
    onChange: (text: string) => void
}


export const EditableSpan = React.memo((props:EditableSpanPropsType) => {

    const {title,onChange} = props
    const [editeMode, setEditeMode] = useState<boolean>(false)
    const [text,setText] = useState<string>('')

    const onDoubleClickHandler = () => {
        setEditeMode(!editeMode)
        setText(title)
    }

    const onBlurHandler = () => {
        setEditeMode(!editeMode)
        onChange(text)

    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.currentTarget.value)
    }


    return editeMode
        ? <InputAddForm type="text" value={text} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <SpanStyle onDoubleClick={onDoubleClickHandler}>{title}</SpanStyle>
})

const SpanStyle = styled.span`
  cursor: pointer;
  color: #fffb00;
  font-size: 24px;
`

const InputAddForm = styled.input`
  padding: 5px;
  border: none;
  border-bottom: 2px solid orange;
  outline: none;
  font-size: 20px;
  color: white;

  &:not(:focus) {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`



