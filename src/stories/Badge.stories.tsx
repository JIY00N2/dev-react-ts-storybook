import { Meta, StoryObj } from '@storybook/react';
import Badge from '../components/common/Badge';
import Image from '../components/common/Image';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => {
    return (
      <Badge {...args}>
        <Image
          src="https://picsum.photos/40"
          width={40}
          height={40}
          alt="icon"
          mode="fill"
        />
      </Badge>
    );
  },
  args: {
    count: 12,
    maxCount: 100,
    backgroundColor: '#f44',
    textColor: 'white',
    showZero: false,
    dot: false,
  },
};
