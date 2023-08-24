import { Meta, StoryObj } from '@storybook/react';
import useDebounce from '../../hooks/useDebounce';
import { useState } from 'react';

const meta: Meta = {
  title: 'Hook/useDebounce',
};

export default meta;

const Component = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string[]>([]);

  useDebounce(
    () => {
      if (value === '') {
        setResult([]);
      } else {
        setResult(['naver', 'kakao', 'line', 'coupang']);
      }
    },
    500,
    [value]
  );

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {result.map((search, index) => (
        <div key={index}>{search}</div>
      ))}
    </div>
  );
};

export const Default: StoryObj<Meta> = {
  render: () => <Component />,
};
