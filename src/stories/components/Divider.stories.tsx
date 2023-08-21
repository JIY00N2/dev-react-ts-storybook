import { Meta, StoryObj } from '@storybook/react';
import Text from '~/components/55/Text';
import Divider from '~/components/57/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Component/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <>
      <Text>위</Text>
      <Divider type='horizontal' />
      <Text>아래</Text>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <>
      <Text>왼쪽</Text>
      <Divider type='vertical' />
      <Text>오른쪽</Text>
    </>
  ),
};
