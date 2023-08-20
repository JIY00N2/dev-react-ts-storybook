import { Meta, StoryObj } from '@storybook/react';
import Input from '~/components/54/LoginForm/Input';

const meta: Meta<typeof Input> = {
  title: 'Component/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
};
