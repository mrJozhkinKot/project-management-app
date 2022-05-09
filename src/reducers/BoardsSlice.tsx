import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id?: number | Date;
  name?: string;
  description?: string;
}
interface Column {
  id?: number | Date;
  name?: string;
  description?: string;
}
interface Task {
  id: number;
  text: string;
}
interface BoardsState {
  boards: Board[];
  board: Board;
  columns: Column[];
  column: Column;
  tasks: Task[];
  task: Task;
  isModalBoard: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: BoardsState = {
  boards: [],
  board: {},
  columns: [
    { id: 1, name: 'column1', description: 'description1' },
    { id: 2, name: 'column2', description: 'description2' },
    { id: 3, name: 'column3', description: 'description3' },
  ],
  column: {},
  tasks: [
    { id: 1, text: 'task1' },
    { id: 2, text: 'task2' },
    { id: 3, text: 'task3' },
    { id: 4, text: 'task4' },
    { id: 5, text: 'task5' },
  ],
  task: {
    id: 0,
    text: '',
  },
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
    createNewTaskList(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export default boardsSlice.reducer;
