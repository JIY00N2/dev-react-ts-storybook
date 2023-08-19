import { Meta, StoryObj } from '@storybook/react';
import { TodoList } from '../../../components/Todo/components';
import { TodoProvider } from '../../../components/Todo/contexts';

const meta: Meta<typeof TodoList> = {
  title: 'Todo/components/TodoList',
  component: TodoList,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <TodoProvider>
        <TodoList {...args} />
      </TodoProvider>
    );
  },
};
