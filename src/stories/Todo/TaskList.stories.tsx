import type { Meta, StoryObj } from '@storybook/react';
import TaskList from '~/components/56/Todo/components/TaskList';

const meta: Meta<typeof TaskList> = {
  title: 'Component/Todo/TaskList',
  component: TaskList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <TaskList {...args} />
    </>
  ),
};
