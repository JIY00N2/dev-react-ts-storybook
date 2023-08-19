import { Meta, StoryObj } from '@storybook/react';
import Avatar from '../components/common/Avatar';
import { CSSProperties } from 'react';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 50, max: 200 },
    },
    shape: {
      options: ['circle', 'round', 'square'],
      control: 'inline-radio',
    },
    mode: {
      options: ['cover', 'fill', 'contain'] as CSSProperties['objectFit'][],
      control: 'inline-radio',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    src: 'https://picsum.photos/70',
    placeholder: 'https://via.placeholder.com/70',
    alt: 'avatar',
    size: 70,
    shape: 'circle',
    mode: 'cover',
  },
};
