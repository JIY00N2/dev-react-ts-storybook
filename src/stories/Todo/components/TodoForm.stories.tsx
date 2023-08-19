import { Meta, StoryObj } from '@storybook/react';
import { TodoForm } from '../../../components/Todo/components';
import { TodoProvider } from '../../../components/Todo/contexts';

const meta: Meta<typeof TodoForm> = {
  title: 'Todo/components/TodoForm',
  component: TodoForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <TodoProvider>
        <TodoForm {...args} />
      </TodoProvider>
    );
  },
};
