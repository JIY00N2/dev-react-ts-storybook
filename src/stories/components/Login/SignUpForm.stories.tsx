import { Meta, StoryObj } from '@storybook/react';
import SignUpForm from '~/components/54/LoginForm/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Component/Login/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'onSubmit' } },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SignUpForm {...args} />,
};
