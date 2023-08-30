import session from 'redux-persist/lib/storage/session';
import { tasks } from './tasks/reducer';
// root reducer를 만들어 준다.
// store값을 주기 위해서 reducer를 전부 합쳐주는 로직이 필요하다.
import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

// storage는 storage(localStorage)와 session(sessionStorage)
// whitelist는 어떤 reducer를 허용해 줄 것인가
// blacklist는 안에 들어가있는것들만 허용 안해줌
const persistConfig = {
  key: 'root',
  storage: session,
  whitelist: ['tasks'],
};

const combinedReducer = combineReducers({ tasks });
const rootReducer = persistReducer(persistConfig, combinedReducer);

// redux-logger를 통해 미들웨어 추가
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

//로컬이나 세션에 저장된 값들을 뺴오기 위한 저장소
export const persistor = persistStore(store);

// useSelector의 타입 만들어주기
export type RootStore = ReturnType<typeof rootReducer>;
