import { Meta, StoryObj } from '@storybook/react';
import Icon from '../components/common/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Common/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 10, max: 100 },
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 4 },
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    name: 'arrow-down-circle',
    size: 16,
    strokeWidth: 2,
    color: '#222',
    rotate: 0,
  },
};
