import { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '~/components/57/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Component/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
      <Breadcrumb.Item href='/level1'>Level1</Breadcrumb.Item>
      <Breadcrumb.Item href='/level2'>Level2</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
