import { combineReducers } from 'redux';
import { boardsAPI } from '../utils/boardService';
import { columnsAPI } from '../utils/columnsService';
import { tasksAPI } from '../utils/tasksService';
import { usersAPI } from '../utils/usersService';
import boardsReducer from './BoardsSlice';
import globalReducer from './globalSlice';

export default combineReducers({
  boardsReducer,
  globalReducer,
  [boardsAPI.reducerPath]: boardsAPI.reducer,
  [columnsAPI.reducerPath]: columnsAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
});
