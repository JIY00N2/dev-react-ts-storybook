import styled from '@emotion/styled';
import Header from './components/Header';
import TaskProvider from './contexts/TaskProvider';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const Todo = () => {
  return (
    <TaskProvider>
      <Container>
        <Header>Todos</Header>
        <NewTaskForm />
        <TaskList css={{ marginTop: 16 }} />
      </Container>
    </TaskProvider>
  );
};

export default Todo;
