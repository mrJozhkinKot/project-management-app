import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBoard,
  getBoards,
  deleteBoard,
  createColumn,
  getColumns,
  deleteColumn,
  getTasks,
  createTask,
} from '../utils/serverAPI';
import { ColumnBodyInterface, TaskCreateBodyInterface } from '../utils/interfaces';

export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async (title: string, thunkAPI) => {
    try {
      await createBoard(title);
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with createBoard`);
    }
  }
);
export const getBoardsThunk = createAsyncThunk('boards/getBoards', async (param, thunkAPI) => {
  try {
    const res = await getBoards();
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(`problems with getBoard`);
  }
});
export const deleteBoardThunk = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, thunkAPI) => {
    try {
      await deleteBoard(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with deleteBoard`);
    }
  }
);
export const createColumnThunk = createAsyncThunk(
  'boards/createColumn',
  async ([boardID, body]: [string, ColumnBodyInterface], thunkAPI) => {
    try {
      await createColumn(boardID, body);
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with createColumn`);
    }
  }
);
export const getColumnsThunk = createAsyncThunk(
  'boards/getColumns',
  async (id: string, thunkAPI) => {
    try {
      const res = await getColumns(id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with getColumns`);
    }
  }
);
export const getTasksThunk = createAsyncThunk(
  'tasks/getTasks',
  async ([boardID, columnID]: string[], thunkAPI) => {
    try {
      const res = await getTasks(boardID, columnID);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with getTasks`);
    }
  }
);
export const createTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async ([boardID, columnID, body]: [string, string, TaskCreateBodyInterface], thunkAPI) => {
    try {
      console.log(boardID, columnID, body);
      await createTask(boardID, columnID, body);
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with createTask`);
    }
  }
);
export const deleteColumnThunk = createAsyncThunk(
  'columns/deleteColumns',
  async ([boardID, columnID]: string[], thunkAPI) => {
    try {
      await deleteColumn(boardID, columnID);
    } catch (error) {
      return thunkAPI.rejectWithValue(`problems with deleteColumns`);
    }
  }
);
