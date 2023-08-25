import { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/common/Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 100, max: 1000 },
    },
    height: {
      control: { type: 'range', min: 100, max: 1000 },
    },
  },
};

export default meta;

const Component = ({ width, height }: { width: number; height: number }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>모달 열기</button>
      <Modal
        width={width}
        height={height}
        visible={show}
        onClose={() => setShow(false)}
      >
        <button onClick={() => setShow(false)}>닫기</button>
      </Modal>
    </div>
  );
};

export const Default: StoryObj<{ width: number; height: number }> = {
  render: (args) => <Component {...args} />,
  args: {
    width: 500,
    height: 500,
  },
};
