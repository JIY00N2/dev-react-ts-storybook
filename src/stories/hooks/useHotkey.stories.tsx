import { Meta, StoryObj } from '@storybook/react';
import useHotkey, { Hotkeys } from '../../hooks/useHotKey';
import { useState } from 'react';

const meta: Meta = {
  title: 'Hook/useHotkey',
};

export default meta;

const Component = () => {
  const hotkeys: Hotkeys = [
    {
      global: true,
      combo: 'cmd+shift+k',
      onKeyDown: () => {
        alert('cmd+shift+k');
      },
    },
    {
      combo: 'shift+backspace',
      onKeyDown: () => {
        setValue('');
      },
    },
  ];
  const [value, setValue] = useState('');
  const { handleKeyDown, handleKeyUp } = useHotkey(hotkeys);

  return (
    <div>
      <div>글로버 단축키 cmd + shift + k 를 눌러보세요</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
