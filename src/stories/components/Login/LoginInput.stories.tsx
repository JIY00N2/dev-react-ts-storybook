import { Meta, StoryObj } from '@storybook/react';
import LoginInput from '~/components/54/LoginForm/LoginInput';

const meta: Meta<typeof LoginInput> = {
  title: 'Component/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <LoginInput {...args} />,
};
