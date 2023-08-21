import { Meta, StoryObj } from '@storybook/react';
import CardForm from '~/components/54/LoginForm/CardForm';

const meta: Meta<typeof CardForm> = {
  title: 'Component/CardForm',
  component: CardForm,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <CardForm {...args}>Card Form</CardForm>,
};
