import { Meta, StoryObj } from '@storybook/react';
import Progress from '~/components/57/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Component/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Progress value={20} {...args} />,
};
