import type {Meta, StoryObj} from '@storybook/react';
import {TaskPriorityMenu} from './TaskPriorityMenu';
import {ReduxStoreProviderDecorator} from '../../../../src/stories/decorators/ReduxStoreProviderDecorator';


const meta = {
    title: 'Example/TasksPriorityMenu',
    component: TaskPriorityMenu,
    decorators:[ReduxStoreProviderDecorator],
    args:
        {
            priority:0,
            priorityColor:'red',
            priorityTitle:'high',
            changePriority:(value:number)=>{},
            changePriorityMode:()=>{}
        }



} satisfies Meta<typeof TaskPriorityMenu>;

export default meta;
type Story = StoryObj<typeof meta>;


export const SelectedHigh : Story = {
    args:{
        priority:0,
        priorityColor:'red',
        priorityTitle:'high',
    }
}

export const SelectedAlmostHigh : Story = {
    args:{
        priority:1,
        priorityColor:'yellow',
        priorityTitle:'AlmostHigh',
    }
}

export const SelectedMiddle : Story = {
    args:{
        priority:2,
        priorityColor:'orange',
        priorityTitle:'Middle',
    }
}

export const SelectedLow : Story = {
    args:{
        priority:3,
        priorityColor:'violet',
        priorityTitle:'low',
    }
}

export const SelectedVeryLow : Story = {
    args:{
        priority:4,
        priorityColor:'skyblue',
        priorityTitle:'very low',
    }
}





