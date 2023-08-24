import { Meta, StoryObj } from '@storybook/react';
import useIntervalFn from '../../hooks/useIntervalFn';
import { useState } from 'react';

const meta: Meta = {
  title: 'Hook/useInterval',
};

export default meta;

const Component = () => {
  const [arr, setArr] = useState<string[]>(['추가됨 ']);
  const { run, clear } = useIntervalFn(() => {
    setArr((prev) => [...prev, '추가됨 ']);
  }, 500);

  return (
    <div>
      <div>0.5초마다 추가됨이 추가됨</div>
      <div>
        {arr.map((item) => (
          <span>{item}</span>
        ))}
      </div>
      <button onClick={run}>실행하기</button>
      <button onClick={clear}>클리어하기</button>
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
