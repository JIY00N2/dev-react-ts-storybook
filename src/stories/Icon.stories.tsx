import { Meta, StoryObj } from '@storybook/react';
import Icon from '~/components/56/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Component/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 80 } },
    strokeWidth: { control: { type: 'range', min: 2, max: 6 } },
    rotate: { control: { type: 'range', min: 0, max: 360 } },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    name: 'box',
    size: 16,
    strokeWidth: 2,
    rotate: 0,
    color: '#222',
  },
};
