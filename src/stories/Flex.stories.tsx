import { Meta, StoryObj } from '@storybook/react';
import Flex from '../components/common/Flex';
import { css } from '@emotion/react';

const meta: Meta<typeof Flex.Row> = {
  title: 'Common/Flex',
  component: Flex.Row,
  tags: ['autodocs'],
};

export default meta;

const Box = () => {
  return (
    <div
      css={css`
        background-color: #44b;
        width: 100%;
        height: 30px;
        color: white;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      Box
    </div>
  );
};

const Box2 = () => {
  return (
    <div
      css={css`
        background-color: #b44;
        width: 100%;
        height: 100px;
        color: white;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      Box
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: ({ gap }) => (
    <Flex.Row gap={gap}>
      <Flex.Col span={4}>
        <Box />
      </Flex.Col>
      <Flex.Col span={2}>
        <Box />
      </Flex.Col>
      <Flex.Col span={2}>
        <Box />
      </Flex.Col>
      <Flex.Col span={4}>
        <Box />
      </Flex.Col>
      <Flex.Col offset={2} span={2}>
        <Box />
      </Flex.Col>
      <Flex.Col span={4}>
        <Box />
      </Flex.Col>
      <Flex.Col span={4}>
        <Box />
      </Flex.Col>
      <Flex.Col span={4}>
        <Box />
      </Flex.Col>
      <Flex.Col span={4}>
        <Flex.Row gap={4}>
          <Flex.Col span={6}>
            <Box2 />
          </Flex.Col>
          <Flex.Col span={6}>
            <Box2 />
          </Flex.Col>
          <Flex.Col span={6}>
            <Box2 />
          </Flex.Col>
        </Flex.Row>
      </Flex.Col>
    </Flex.Row>
  ),
  args: {
    gap: [4, 4],
  },
};
