import LoginForm from './components/LoginForm';
import { Todo } from './components/Todo';
import Text from './components/common/Text';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });
}

function App() {
  return (
    <>
      <LoginForm
        onSubmit={async () => {
          await sleep(1000);
          console.log('submit!');
        }}
      />
      <Todo />
      <Text color="red" style={{ color: 'blue' }}>
        lalalal
      </Text>
    </>
  );
}

export default App;
