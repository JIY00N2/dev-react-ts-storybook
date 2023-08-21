import { Meta, StoryObj } from '@storybook/react';
import Image from '~/components/55/ImageComponent';

const meta: Meta<typeof Image> = {
  title: 'Component/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['cover', 'fill', 'contain'],
      control: 'inline-radio',
    },
  },
  args: {
    lazy: false,
    block: false,
    src: 'https://picsum.photos/200',
    placeholder: 'https://via.placeholder.com/200',
    threshold: 0.5,
    width: 200,
    height: 200,
    mode: 'cover',
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Image {...args} />,
};

export const Lazy: Story = {
  render: (args) => (
    <div>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image {...args} lazy block src={`${args.src}?${i}`} key={i} />
      ))}
    </div>
  ),
};
