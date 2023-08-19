import { Meta, StoryObj } from '@storybook/react';
import { TodoHeader } from '../../../components/Todo/components';
import { TodoProvider } from '../../../components/Todo/contexts';

const meta: Meta<typeof TodoHeader> = {
  title: 'Todo/components/TodoHeader',
  component: TodoHeader,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <TodoProvider>
        <TodoHeader {...args} />
      </TodoProvider>
    );
  },
};
