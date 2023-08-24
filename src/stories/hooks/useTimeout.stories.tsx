import { Meta, StoryObj } from '@storybook/react';
import useTimeoutFn from '../../hooks/useTimeoutFn';
import useTimeout from '../../hooks/useTimeout';

const meta: Meta = {
  title: 'Hook/useTimeout',
};

export default meta;

const ComponentA = () => {
  const clear = useTimeout(() => {
    alert('2초가 지났습니다');
  }, 2000);

  return (
    <div>
      <div>useTimeout 테스트</div>
      <div>첫 렌더링 후 2초 뒤에 alert가 표시됩니다.</div>
      <button onClick={clear}>클리어하기</button>
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <ComponentA />,
};

const ComponentB = () => {
  const { run, clear } = useTimeoutFn(() => {
    alert('2초가 지났습니다');
  }, 2000);

  return (
    <div>
      <div>useTimeoutFn 테스트</div>
      <button onClick={run}>2초 뒤 콜백 실행</button>
      <button onClick={clear}>클리어하기</button>
    </div>
  );
};

export const TimeoutFn: StoryObj<typeof meta> = {
  render: () => <ComponentB />,
};
