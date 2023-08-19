import { Meta, StoryObj } from '@storybook/react';
import { Todo } from '../../components/Todo';

const meta: Meta<typeof Todo> = {
  title: 'Todo/Todo',
  component: Todo,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <Todo {...args} />;
  },
};
