import { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/54/LoginForm/Button';

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'onClick' } },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
};
