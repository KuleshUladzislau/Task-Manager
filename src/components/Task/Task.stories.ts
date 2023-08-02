import type {Meta, StoryObj} from '@storybook/react';

import {Task} from './Task';
import {storiesOf} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Tasks',
    component: Task,
    decorators:[ReduxStoreProviderDecorator],
    args:
        {
            currentTask:'',
            title:'TestTask',
            todoListId:'',
            setCurrentTask:()=>{},
            id:'',
            isFetching:false,
            order:1,
            addedDate:'',
            deadline:'',
            status:1,
            description:'',
            priority:1,
            startDate:''
        }



} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DefaultTask : Story = {
    args:{priority:2}
}
export const HighTaskPriority : Story = {
    args:{priority:0}
}

export const AllMostTaskPriority : Story = {
    args:{priority:1}
}

export const MiddleTaskPriority : Story = {
    args:{priority:2}
}

export const LowTaskPriority : Story = {
    args:{priority:3}
}
export const VeryLowTaskPriority : Story = {
    args:{priority:4}
}




