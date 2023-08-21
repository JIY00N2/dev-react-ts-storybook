import { Meta, StoryObj } from '@storybook/react';
import Skeleton from '~/components/57/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Component/Skeleton',
  tags: ['autodocs'],
};

export default meta;
export type Story<T> = StoryObj<T>;

export const Box: Story<typeof Skeleton.Box> = {
  render: (args) => <Skeleton.Box {...args} />,
  args: {
    width: 200,
    height: 100,
  },
};

export const Circle: Story<typeof Skeleton.Circle> = {
  render: (args) => <Skeleton.Circle {...args} />,
  args: {
    size: 200,
  },
};

export const Paragraph: Story<typeof Skeleton.Paragraph> = {
  render: (args) => <Skeleton.Paragraph {...args} />,
};

export const Sample: Story<object> = {
  render: () => (
    <>
      <div css={{ float: 'left', marginRight: 16 }}>
        <Skeleton.Circle size={60} />
      </div>
      <div css={{ float: 'left', width: '80%' }}>
        <Skeleton.Paragraph line={4} />
      </div>
      <div css={{ clear: 'both' }} />
    </>
  ),
};
