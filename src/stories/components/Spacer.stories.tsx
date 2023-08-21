import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import Spacer from '~/components/55/Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Component/Spacer',
  component: Spacer,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// 테스트를 위해 Box 컴포넌트 작성
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
    ></div>
  );
};

export const Horizontal: Story = {
  render: (args) => (
    <Spacer {...args} type='horizontal'>
      <Box />
      <Box />
      <Box />
    </Spacer>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Spacer {...args} type='vertical'>
      <Box block />
      <Box block />
      <Box block />
    </Spacer>
  ),
};
