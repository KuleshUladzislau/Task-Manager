import type { Meta, StoryObj } from '@storybook/react';
import TasksPriority from './TasksPriority';
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";
import {Task} from "../Task/Task";




const meta = {
    title: 'TasksPriority',
    component: TasksPriority,
    decorators:[ReduxStoreProviderDecorator],
    args:{
        tasks:[
            {description: '', title: 'Task', status: 0, priority: 1, startDate: '',
                deadline: '', id: '', todoListId: '', order: 0, addedDate: ''  },
            {description: '', title: 'Task', status: 0, priority: 1, startDate: '',
                deadline: '', id: '', todoListId: '', order: 0, addedDate: ''  },
            {description: '', title: 'Task', status: 0, priority: 1, startDate: '',
                deadline: '', id: '', todoListId: '', order: 0, addedDate: ''  },
            {description: '', title: 'Task', status: 0, priority: 1, startDate: '',
                deadline: '', id: '', todoListId: '', order: 0, addedDate: ''  },
            {description: '', title: 'Task', status: 0, priority: 1, startDate: '',
                deadline: '', id: '', todoListId: '', order: 0, addedDate: ''  }
        ]
    }



} satisfies Meta<typeof TasksPriority>;

export default meta;
type Story = StoryObj<typeof meta>;



export const DefaultPriority : Story = {
 args:{

 }
}





