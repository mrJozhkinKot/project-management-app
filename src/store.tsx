import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { boardsAPI } from './utils/boardService';
import { usersAPI } from './utils/usersService';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(boardsAPI.middleware, usersAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
