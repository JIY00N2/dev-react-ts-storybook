import { Meta, StoryObj } from '@storybook/react';
import ErrorText from '~/components/54/LoginForm/ErrorText';

const meta: Meta<typeof ErrorText> = {
  title: 'Component/Login/ErrorText',
  component: ErrorText,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ErrorText {...args}>ErrorText</ErrorText>,
};
