import { combineReducers } from 'redux';
import { boardsAPI } from '../utils/boardService';
import { columnsAPI } from '../utils/columnsService';
import { tasksAPI } from '../utils/tasksService';
import boardsReducer from './BoardsSlice';

export default combineReducers({
  boardsReducer,
  [boardsAPI.reducerPath]: boardsAPI.reducer,
  [columnsAPI.reducerPath]: columnsAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});
