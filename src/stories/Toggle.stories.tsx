import { Meta, StoryObj } from '@storybook/react';
import Toggle from '../components/common/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    name: 'default',
    on: false,
    disabled: false,
  },
};
