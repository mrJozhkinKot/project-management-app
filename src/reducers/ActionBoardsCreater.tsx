import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBoard, getBoards, deleteBoard } from '../utils/serverAPI';

export const createBoardThunk = createAsyncThunk('boards/createBoard', async (title: string) => {
  await createBoard(title);
});

export const getBoardsThunk = createAsyncThunk('boards/getBoards', async () => {
  const res = await getBoards();
  return res;
});

export const deleteBoardThunk = createAsyncThunk('boards/deleteBoard', async (id: string) => {
  await deleteBoard(id);
});
