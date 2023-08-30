import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './components/56/Todo/redux/index.ts';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// 전역 provider를 컨텍스트를 통해서 넘겨줘야 함
// store값을 주기 위해서 reducer를 전부 합쳐주는 로직이 필요하다.
// 리덕스를 통해 전역적으로 task data를 관리 할 수 있다.
