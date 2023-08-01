import React from 'react';
import {PriorityStyle, TaskStyle} from "../Task";
import styled from "styled-components";


type TaskPriorityMenuType = {
    priority: number
    changePriority: (value: number) => void
    changePriorityMode: () => void
    priorityColor: string
}

export const TaskPriorityMenu = (props: TaskPriorityMenuType) => {

    const
        {
            priority,
            priorityColor,
            changePriority,
            changePriorityMode
        }
            = props


    const highPriority = priority === 0 ? 'red' : ''
    const almostHighPriority = priority === 1 ? 'yellow' : ''
    const MiddlePriority = priority === 2 ? 'orange' : ''
    const lowPriority = priority === 3 ? 'violet' : ''
    const veryLowPriority = priority === 4 ? 'skyBlue' : ''


    return (
        <TaskStyle>
            <PriorityStyle background={`${priorityColor}`} onClick={changePriorityMode}>priority</PriorityStyle>
            <ul>
                <ListStyle onClick={() => changePriority(0)} background={highPriority}>high</ListStyle>
                <ListStyle onClick={() => changePriority(1)} background={almostHighPriority}>almost high</ListStyle>
                <ListStyle onClick={() => changePriority(2)} background={MiddlePriority}>middle</ListStyle>
                <ListStyle onClick={() => changePriority(3)} background={lowPriority}>low</ListStyle>
                <ListStyle onClick={() => changePriority(4)} background={veryLowPriority}>very low</ListStyle>
            </ul>
        </TaskStyle>
    )
}

interface ListStyleProps {

    background:string
}

const ListStyle = styled.li<ListStyleProps>`
    background: ${props=>props.background};
`

