import type { Meta, StoryObj } from '@storybook/react';
import Task from '~/components/56/Todo/components/Task';

const meta: Meta<typeof Task> = {
  title: 'Component/Todo/Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'string' },
    complete: { control: 'boolean' },
  },
  args: { content: '출근하기', complete: false },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Task {...args} content={args.content} complete={args.complete} />
    </>
  ),
};
