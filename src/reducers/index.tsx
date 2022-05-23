import { combineReducers } from 'redux';
import { boardsAPI } from '../utils/boardService';
import boardsReducer from './BoardsSlice';

export default combineReducers({
  boardsReducer,
  [boardsAPI.reducerPath]: boardsAPI.reducer,
});
