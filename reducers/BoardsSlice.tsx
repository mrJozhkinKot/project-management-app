import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id?: number;
  name?: string;
  description?: string;
}

interface BoardsState {
  boards: Board[];
  board: Board;
  isModalBoard: boolean;
}

const initialState: BoardsState = {
  boards: [],
  board: {},
  isModalBoard: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    deleteBoard(state, action: PayloadAction<number | undefined>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
  },
});

export default boardsSlice.reducer;
