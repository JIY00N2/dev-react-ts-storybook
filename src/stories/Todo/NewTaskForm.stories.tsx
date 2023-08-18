import type { Meta, StoryObj } from '@storybook/react';
import NewTaskForm from '~/components/56/Todo/components/NewTaskForm';

const meta: Meta<typeof NewTaskForm> = {
  component: NewTaskForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <NewTaskForm {...args} />
    </>
  ),
};
