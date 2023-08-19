import { Meta, StoryObj } from '@storybook/react';
import Upload from '../components/common/Upload';

const meta: Meta<typeof Upload> = {
  title: 'Common/Upload',
  component: Upload,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ name, onChange, ...rest }) => {
    return (
      <Upload
        name={name}
        onChange={onChange}
        css={{ backgroundColor: 'lightblue' }}
        {...rest}
      >
        {({ file, dragging }) => (
          <div
            css={{
              width: 300,
              height: 100,
              border: '4px dashed #aaa',
              borderColor: dragging ? 'black' : '#aaa',
            }}
          >
            {file ? file.name : '클릭하거나 드래그해서 파일업로드'}
          </div>
        )}
      </Upload>
    );
  },
  args: {
    name: 'upload',
    onChange: (file) => console.log(file.name),
  },
};
