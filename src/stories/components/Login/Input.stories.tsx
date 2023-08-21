import { Meta, StoryObj } from '@storybook/react';
import Input from '~/components/54/LoginForm/Input';

const meta: Meta<typeof Input> = {
  title: 'Component/Login/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
};
