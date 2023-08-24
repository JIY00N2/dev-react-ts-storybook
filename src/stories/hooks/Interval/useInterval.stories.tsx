import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import useInterval from '~/hooks/Interval/useInterval';

const meta: Meta<typeof useInterval> = {
  title: 'Hook/Interval/useInterval ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const [array, setArray] = useState<string[]>([]);
  const clear = useInterval(() => {
    setArray([...array, '추가됨']);
  }, 1000);
  return (
    <>
      <div>useInterval 테스트</div>
      <div>{array}</div>
      <button onClick={clear}>멈춰!</button>
    </>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
