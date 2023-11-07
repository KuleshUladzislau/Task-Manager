import React, {ButtonHTMLAttributes} from 'react';
import {PriorityStyle, TaskStyle} from "../Task";
import styled from "styled-components";


type TaskPriorityMenuType = {
    priority: number
    changePriority: (value: number) => void
    changePriorityMode: () => void
    priorityColor: string
    priorityTitle: string
}

export const TaskPriorityMenu = (props: TaskPriorityMenuType) => {

    const
        {
            priority,
            priorityColor,
            priorityTitle,
            changePriority,
            changePriorityMode
        }
            = props


    const highPriority = priority === 0 ? 'red' : ''
    const MiddlePriority = priority === 1 ? 'orange' : ''
    const lowPriority = priority === 2 ? 'skyBlue' : ''

    const onClickPriorityHandler = (value: number) => {
        changePriority(value)
        changePriorityMode()
    }



    return (
        <TaskStyle>
            <PriorityStyle background={`${priorityColor}`} onClick={changePriorityMode}
                           autoFocus>{priorityTitle}</PriorityStyle>
            <UlStyle>
                <ListStyle onClick={() => onClickPriorityHandler(0)}
                           background={highPriority}>high</ListStyle>
                <ListStyle onClick={() => onClickPriorityHandler(1)}
                           background={MiddlePriority}>middle</ListStyle>
                <ListStyle onClick={() => onClickPriorityHandler(2)}
                           background={lowPriority}>low</ListStyle>
            </UlStyle>

        </TaskStyle>
    )
}

interface ListStyleProps {
    background: string
}

const UlStyle = styled.ul`
  display: inline-block;
  padding: 20px;
`
const ListStyle = styled.li<ListStyleProps>`
  background: ${props => props.background};
  list-style-type: none;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;

`



