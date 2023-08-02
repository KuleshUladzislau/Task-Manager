import type { Meta, StoryObj } from '@storybook/react';

import TasksPriority from './TasksPriority';
import {storiesOf} from "@storybook/react";


const meta = {
    title: 'Example/TasksPriority',
    component: TasksPriority,


} satisfies Meta<typeof TasksPriority>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPriority : Story = {
 args:{

 }
}



