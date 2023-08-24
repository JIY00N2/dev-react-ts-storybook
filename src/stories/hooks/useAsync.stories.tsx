import { Meta, StoryObj } from '@storybook/react';
import useAsyncFn from '../../hooks/useAsyncFn';
import useAsync from '../../hooks/useAsync';

const meta: Meta = {
  title: 'Hook/useAsync',
};

export default meta;

function asyncReturnValue(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str);
    }, 1000);
  });
}

function asyncReturnError(str: string): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(str);
    }, 1000);
  });
}

const ComponentA = () => {
  const [successState, successCallback] = useAsyncFn(asyncReturnValue, []);
  const [failState, failCallback] = useAsyncFn(asyncReturnError, []);

  return (
    <div>
      <div>{JSON.stringify(successState)}</div>
      <button onClick={() => successCallback('success')}>fetch!</button>
      <div>{JSON.stringify(failState)}</div>
      <button onClick={() => failCallback('fail')}>fetch!</button>
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <ComponentA />,
};

const ComponentB = () => {
  const state = useAsync(asyncReturnValue, ['success'], []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UseAsync: StoryObj<typeof meta> = {
  render: () => <ComponentB />,
};
