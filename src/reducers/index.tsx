import { combineReducers } from 'redux';
import { boardsAPI } from '../utils/boardService';
import { usersAPI } from '../utils/usersService';
import boardsReducer from './BoardsSlice';
import globalReducer from './globalSlice';

export default combineReducers({
  boardsReducer,
  globalReducer,
  [boardsAPI.reducerPath]: boardsAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
});
