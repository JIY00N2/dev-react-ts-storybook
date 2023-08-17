import type { Meta, StoryObj } from '@storybook/react';
import Toggle from '../components/55/Toggle/index';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    name: '',
    on: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Toggle {...args}>Toggle</Toggle>
    </>
  ),
};
