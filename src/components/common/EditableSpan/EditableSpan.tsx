import React, {ChangeEvent, useState} from 'react';



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
        ? <input type="text" value={text} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
})

