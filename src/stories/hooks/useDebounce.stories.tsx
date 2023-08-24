import { useState, Fragment } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import useDebounce from '~/hooks/useDebounce';

const meta: Meta<typeof useDebounce> = {
  title: 'Hook/useDebounce ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 회사 검색 로직
const companies = [
  'Cobalt',
  'Grepp',
  'Kakao',
  'Naver',
  'Daangn',
  'Coupang',
  'Line',
  'Woowahan',
];

const Component = () => {
  // 검색 값 담는 상태
  const [value, setValue] = useState('');
  // 검색 결과를 담을 상태
  const [result, setResult] = useState<string[]>([]);

  useDebounce(
    () => {
      // 검색 결과가 비어있을 경우
      if (value === '') {
        setResult([]);
      }
      // 특정 값이 있는 경우
      else {
        setResult(
          companies.filter((company) =>
            company.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
      // 0.3초 value가 변경될 경우 useDebounce 호출 안함
      // deps = value
    },
    300,
    [value]
  );

  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {result.map((item) => (
          <Fragment key={item}>
            {item}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
