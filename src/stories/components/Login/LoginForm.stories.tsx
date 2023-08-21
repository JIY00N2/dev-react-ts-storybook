import { Meta, StoryObj } from '@storybook/react';
import LoginForm from '~/components/54/LoginForm/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Component/Login/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'onSubmit' } },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <LoginForm {...args} />,
};
