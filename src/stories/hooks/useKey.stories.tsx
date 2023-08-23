import { Meta, StoryObj } from '@storybook/react';
import { useKey } from '../../hooks';

const meta: Meta = {
  title: 'Hook/useKey',
};

export default meta;

const Component = () => {
  useKey('keydown', 'f', () => {
    alert('f key down!!');
  });
  return <div>f 키를 눌러보세요</div>;
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
