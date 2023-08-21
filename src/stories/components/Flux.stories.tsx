import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';
import Flux from '~/components/57/Flux';

const { Row, Col } = Flux;

const meta: Meta<typeof Flux> = {
  title: 'Component/Flux',
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

const Box = () => {
  return (
    <div
      css={css`
        background-color: #44b;
        width: 100%;
        height: 18px;
        color: white;
        text-align: center;
        border-radius: 8px;
      `}
    >
      Box
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Row gap={[8, 8]}>
      <Col span={4}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={12}>
        <Box />
      </Col>
    </Row>
  ),
};
