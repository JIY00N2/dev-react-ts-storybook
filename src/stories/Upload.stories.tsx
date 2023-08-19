import { Meta, StoryObj } from '@storybook/react';
import Upload from '~/components/56/Upload';

const meta: Meta<typeof Upload> = {
  title: 'Component/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Upload {...args}>
      {({ file, dragging }) => (
        <div
          css={{
            width: 300,
            height: 100,
            border: '4px solid #aaa',
            borderColor: dragging ? 'black' : '#aaa',
          }}
        >
          {file ? file.name : 'Click or drag files to this area to upload!'}
        </div>
      )}
    </Upload>
  ),
  args: {
    droppable: true,
  },
};
