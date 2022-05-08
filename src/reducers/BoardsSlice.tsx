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
  boards: [
    { id: 1, name: 'board1', description: 'some description1' },
    { id: 2, name: 'board2', description: 'some description2' },
    { id: 3, name: 'board3', description: 'some description3' },
    { id: 4, name: 'board4', description: 'some description4' },
    { id: 5, name: 'board5', description: 'some description5' },
    { id: 6, name: 'board6', description: 'some description6' },
  ],
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
