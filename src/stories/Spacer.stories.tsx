import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import Spacer from '../components/common/Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Common/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['horizontal', 'vertical'],
      control: 'inline-radio',
    },
    size: {
      control: { type: 'range', min: 0, max: 30 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Box = ({ block, style }: { block?: boolean; style?: CSSProperties }) => {
  return (
    <div
      style={{
        display: block ? 'block' : 'inline-block',
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        ...style,
      }}
    />
  );
};

export const Horizontal: Story = {
  render: (args) => (
    <Spacer {...args}>
      <Box />
      <Box />
      <Box />
    </Spacer>
  ),
  args: {
    type: 'horizontal',
    size: 8,
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Spacer {...args}>
      <Box block />
      <Box block />
      <Box block />
    </Spacer>
  ),
  args: {
    type: 'vertical',
    size: 8,
  },
};
