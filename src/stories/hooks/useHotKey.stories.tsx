import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import useHotKey from '~/hooks/useHotKey';

const meta: Meta<typeof useHotKey> = {
  title: 'Hook/useHotkey ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const [value, setVale] = useState('');
  const hotkeys = [
    {
      global: true,
      combo: 'meta + shift + k',
      onKeyDown: () => {
        alert('meta+ shift +k');
      },
    },
    {
      global: false,
      combo: 'esc',
      onKeyDown: () => {
        // 입력 후 esc 누르면 지워지기
        setVale('');
      },
    },
  ];
  const { handleKeyDown } = useHotKey(hotkeys);

  return (
    <div>
      <div>useHotKey 테스트</div>
      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setVale(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
