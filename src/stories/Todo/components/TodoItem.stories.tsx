import { Meta, StoryObj } from '@storybook/react';
import { TodoItem } from '../../../components/Todo/components';
import { TodoProvider } from '../../../components/Todo/contexts';

const meta: Meta<typeof TodoItem> = {
  title: 'Todo/components/TodoItem',
  component: TodoItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <TodoProvider>
        <TodoItem {...args} />
      </TodoProvider>
    );
  },
  args: {
    todo: {
      id: '1',
      complete: true,
      text: '타입스크립트 공부하기',
    },
  },
};
