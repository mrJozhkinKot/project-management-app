import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBoard, getBoards } from '../utils/serverAPI';

export const createBoardThunk = createAsyncThunk('boards/createBoard', async (title: string) => {
  await createBoard(title);
});

export const getBoardsThunk = createAsyncThunk('boards/getBoards', async () => {
  const res = await getBoards();
  return res;
});
