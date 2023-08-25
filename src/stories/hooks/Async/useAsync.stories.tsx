import { Meta, StoryObj } from '@storybook/react';
import useAsync from '~/hooks/Async/useAsync';

const meta: Meta = {
  title: 'Hook/Async/useAsync ',
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
//   const state = useAsync(async () => {
//     return await asyncReturnValue();
//   }, []);
//   return (
//     <div>
//       <div>useAsync 테스트</div>
//       <div>{JSON.stringify(state)}</div>
//     </div>
//   );
// };

const SuccessComponent = () => {
  const state = useAsync(asyncReturnValue, ['success'], []);
  return (
    <div>
      <div>useAsync 테스트</div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

const ErrorComponent = () => {
  const state = useAsync(asyncReturnError, ['error'], []);
  return (
    <div>
      <div>useAsync 테스트</div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

// const ErrorComponent = () => {
//   const state = useAsync(async () => {
//     return await asyncReturnError();
//   }, []);
//   return (
//     <div>
//       <div>useAsyncFn 테스트</div>
//       <div>{JSON.stringify(state)}</div>
//     </div>
//   );
// };

export const Success: Story = {
  render: () => <SuccessComponent />,
};

export const Error: Story = {
  render: () => <ErrorComponent />,
};
