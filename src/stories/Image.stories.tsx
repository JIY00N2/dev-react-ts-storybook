import { Meta, StoryObj } from '@storybook/react';
import Image from '../components/common/Image';

const meta: Meta<typeof Image> = {
  title: 'Common/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['cover', 'fill', 'contain'],
      control: 'inline-radio',
    },
    width: {
      control: { type: 'range', min: 200, max: 1000 },
    },
    height: {
      control: { type: 'range', min: 200, max: 1000 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ alt, ...args }) => (
    <>
      {alt}
      <Image alt="image" {...args} />
      <Image alt="image" {...args} />
    </>
  ),
  args: {
    src: 'https://picsum.photos/500',
    mode: 'cover',
    width: 200,
    height: 200,
    block: false,
    threshold: 1,
  },
};

export const Lazy: Story = {
  render: ({ alt, ...args }) => (
    <>
      {alt}
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <Image key={i} alt="image" {...args} />
        ))}
    </>
  ),
  args: {
    src: 'https://picsum.photos/500',
    lazy: true,
    placeholder: 'https://via.placeholder.com/500',
    mode: 'cover',
    width: 500,
    height: 500,
    block: false,
    threshold: 0.2,
  },
};
