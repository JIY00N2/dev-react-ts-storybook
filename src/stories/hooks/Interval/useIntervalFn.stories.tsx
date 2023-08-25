import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import useIntervalFn from '~/hooks/Interval/useIntervalFn';

const meta: Meta<typeof useIntervalFn> = {
  title: 'Hook/Interval/useIntervalFn ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const [array, setArray] = useState<string[]>([]);
  const { run, clear } = useIntervalFn(() => {
    setArray([...array, '추가됨']);
  }, 1000);
  return (
    <>
      <div>useIntervalFn 테스트</div>
      <div>{array}</div>
      <button onClick={run}>1초마다 추가!</button>
      <button onClick={clear}>멈추기!</button>
    </>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
