import React from 'react';
import {PriorityStyle, TaskStyle} from "../Task";


type TaskPriorityMenuType = {
    priority: number
    changePriority: (value: number) => void
    changePriorityValue: () => void
    priorityColor: string
}

export const TaskPriorityMenu = (props: TaskPriorityMenuType) => {

    const
        {
            priority,
            priorityColor,
            changePriority,
            changePriorityValue
        }
            = props


    const highPriority = priority === 0 ? 'red' : ''
    const middlePriority = priority === 1 ? 'skyBlue' : ''
    const lowPriority = priority === 2 ? 'yellow' : ''
    const veryHighPriority = priority === 3 ? 'violet' : ''
    const smallMiddlePriority = priority === 4 ? 'orange' : ''


    return (
        <TaskStyle>
            <PriorityStyle background={`${priorityColor}`} onClick={changePriorityValue}>priority</PriorityStyle>
            <ul>
                <li onClick={() => changePriority(0)} style={{background: `${highPriority}`}}>high</li>
                <li onClick={() => changePriority(1)} style={{background: `${middlePriority}`}}>middle</li>
                <li onClick={() => changePriority(2)} style={{background: `${lowPriority}`}}>low</li>
                <li onClick={() => changePriority(3)} style={{background: `${veryHighPriority}`}}>low</li>
                <li onClick={() => changePriority(4)} style={{background: `${smallMiddlePriority}`}}>low</li>
            </ul>
        </TaskStyle>
    )
}



