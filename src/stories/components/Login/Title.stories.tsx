import { Meta, StoryObj } from '@storybook/react';
import Title from '~/components/54/LoginForm/Title';

const meta: Meta<typeof Title> = {
  title: 'Component/Title',
  component: Title,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Title {...args}>Title</Title>,
};
