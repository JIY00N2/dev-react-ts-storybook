import { Meta, StoryObj } from '@storybook/react';
import useAsyncFn from '~/hooks/Async/useAsyncFn';

const meta: Meta = {
  title: 'Hook/Async/useAsyncFn ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const asyncReturnValue = (str: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str);
    }, 1000);
  });
};

const asyncReturnError = (str: string): Promise<string> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(str);
    }, 1000);
  });
};

// const SuccessComponent = () => {
//   const [state, callback] = useAsyncFn(async () => {
//     return await asyncReturnValue();
//   }, []);
//   return (
//     <div>
//       <div>useAsyncFn 테스트</div>
//       <div>{JSON.stringify(state)}</div>
//       <button onClick={callback} disabled={state.isLoading}>
//         비동기 호출
//       </button>
//     </div>
//   );
// };

// const ErrorComponent = () => {
//   const [state, callback] = useAsyncFn(async () => {
//     return await asyncReturnError();
//   }, []);
//   return (
//     <div>
//       <div>useAsyncFn 테스트</div>
//       <div>{JSON.stringify(state)}</div>
//       <button onClick={callback} disabled={state.isLoading}>
//         비동기 호출
//       </button>
//     </div>
//   );
// };

// export const Success: Story = {
//   render: () => <SuccessComponent />,
// };

// export const Error: Story = {
//   render: () => <ErrorComponent />,
// };

const Component = () => {
  const [successState, successCallback] = useAsyncFn(asyncReturnValue, []);
  const [failState, failCallback] = useAsyncFn(asyncReturnError, []);

  return (
    <div>
      <div>{JSON.stringify(successState)}</div>
      <button onClick={() => successCallback('success')}>fetch</button>
      <div>{JSON.stringify(failState)}</div>
      <button onClick={() => failCallback('fail')}>fetch</button>
    </div>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
