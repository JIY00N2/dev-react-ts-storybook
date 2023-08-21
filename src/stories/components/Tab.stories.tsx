import { Meta, StoryObj } from '@storybook/react';
import Header from '~/components/55/Header';
import Tab from '~/components/57/Tab';

const meta: Meta<typeof Tab> = {
  title: 'Component/Tab',
  component: Tab,
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tab {...args}>
      <Tab.Item active={false} title='Item 1' index='item 1' type='TabItem'>
        Content1
      </Tab.Item>
      <Tab.Item active={false} title='Item 2' index='item 2' type='TabItem'>
        Content2
      </Tab.Item>
      <Tab.Item active={false} title='Item 3' index='item 3' type='TabItem'>
        <Header>Header</Header>
      </Tab.Item>
    </Tab>
  ),
};
