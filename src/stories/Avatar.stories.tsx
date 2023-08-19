import { Meta, StoryObj } from '@storybook/react';
import Avatar from '~/components/56/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Component/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'inline-radio',
      options: ['circle', 'round', 'square'],
    },
    size: {
      control: { type: 'range', min: 40, max: 200 },
    },
    mode: {
      control: 'inline-radio',
      options: ['contain', 'cover', 'fill'],
    },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Avatar {...args}></Avatar>,
  args: {
    src: 'https://picsum.photos/200',
    shape: 'circle',
    size: 70,
    mode: 'cover',
  },
};

export const Group: Story = {
  render: (args) => (
    <Avatar.Group {...args}>
      <Avatar
        src='https://picsum.photos/200?1'
        type='Avatar'
        size={50}
        alt=''
      />
      <Avatar
        src='https://picsum.photos/200?2'
        type='Avatar'
        size={50}
        alt=''
      />
      <Avatar
        src='https://picsum.photos/200?3'
        type='Avatar'
        size={50}
        alt=''
      />
      <Avatar
        src='https://picsum.photos/200?4'
        type='Avatar'
        size={50}
        alt=''
      />
    </Avatar.Group>
  ),
  args: {
    src: 'https://picsum.photos/200',
    shape: 'circle',
    size: 70,
    mode: 'cover',
  },
};
