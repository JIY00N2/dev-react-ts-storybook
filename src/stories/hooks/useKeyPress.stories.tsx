import { Meta, StoryObj } from '@storybook/react';
import { useKeyPress } from '../../hooks';

const meta: Meta = {
  title: 'Hook/useKeyPress',
};

export default meta;

const Component = () => {
  const isKeyPress = useKeyPress(' ');
  return <div>{String(isKeyPress)}</div>;
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
