import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id?: number | Date;
  name?: string;
  description?: string;
}

interface BoardsState {
  boards: Board[];
  board: Board;
  isModalBoard: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: BoardsState = {
  boards: [],
  board: {},
  isModalBoard: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    deleteBoard(state, action: PayloadAction<number | Date | undefined>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    setIsModalBoard(state, action: PayloadAction<boolean>) {
      state.isModalBoard = action.payload;
    },
    createNewBoard(state, action: PayloadAction<Board[]>) {
      state.boards = [...state.boards, ...action.payload];
    },
  },
});

export default boardsSlice.reducer;
