import { Meta, StoryObj } from '@storybook/react';
import Image from '~/components/55/ImageComponent';
import Badge from '~/components/56/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Component/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Badge {...args}>
      <Image
        src='https://picsum.photos/60'
        width={60}
        height={60}
        alt='image'
        style={{ borderRadius: 8 }}
      />
    </Badge>
  ),
  args: {
    count: 10,
    maxCount: 100,
    backgroundColor: '#2d2d2d',
    textColor: 'white',
    showZero: false,
    dot: false,
  },
};
