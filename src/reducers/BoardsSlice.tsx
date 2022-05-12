import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardInterface, ColumnInterface, TaskDraftInterface } from '../utils/interfaces';

interface BoardsState {
  boards: BoardInterface[];
  columns: ColumnInterface[];
  column: ColumnInterface;
  isModalBoard: boolean;
  isModalTask: boolean;
  isModalEditTask: boolean;
  isModalColumn: boolean;
}

const initialState: BoardsState = {
  boards: [],
  columns: [
    {
      id: '12323',
      title: 'column1',
      order: 0,
      tasks: [
        { id: '1', title: 'task1', description: '', order: 1, userId: '', files: [] },
        { id: '2', title: 'task2', description: '', order: 1, userId: '', files: [] },
        { id: '3', title: 'task3', description: '', order: 1, userId: '', files: [] },
        { id: '4', title: 'task4', description: '', order: 1, userId: '', files: [] },
      ],
    },
    {
      id: '34434',
      title: 'column2',
      order: 1,
      tasks: [
        { id: '11', title: 'task11', description: '', order: 1, userId: '', files: [] },
        { id: '12', title: 'task12', description: '', order: 1, userId: '', files: [] },
        { id: '13', title: 'task13', description: '', order: 1, userId: '', files: [] },
        { id: '14', title: 'task14', description: '', order: 1, userId: '', files: [] },
      ],
    },
    {
      id: '35535',
      title: 'column3',
      order: 2,
      tasks: [
        { id: '21', title: 'task21', description: '', order: 1, userId: '', files: [] },
        { id: '22', title: 'task22', description: '', order: 1, userId: '', files: [] },
        { id: '23', title: 'task23', description: '', order: 1, userId: '', files: [] },
        { id: '24', title: 'task24', description: '', order: 1, userId: '', files: [] },
      ],
    },
  ],
  column: {
    id: '',
    title: '',
    order: 0,
    tasks: [],
  },
  isModalBoard: false,
  isModalTask: false,
  isModalColumn: false,
  isModalEditTask: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    deleteBoard(state, action: PayloadAction<string | undefined>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    deleteColumn(state, action: PayloadAction<string | undefined>) {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    },
    setIsModalBoard(state, action: PayloadAction<boolean>) {
      state.isModalBoard = action.payload;
    },
    setIsModalTask(state, action: PayloadAction<boolean>) {
      state.isModalTask = action.payload;
    },
    setIsModalEditTask(state, action: PayloadAction<boolean>) {
      state.isModalEditTask = action.payload;
    },
    setIsModalColumn(state, action: PayloadAction<boolean>) {
      state.isModalColumn = action.payload;
    },
    createNewBoard(state, action: PayloadAction<BoardInterface[]>) {
      state.boards = [...state.boards, ...action.payload];
    },
    reorderTaskList(state, action: PayloadAction<TaskDraftInterface[]>) {
      state.columns.forEach((col) => {
        if (col.id === state.column.id) {
          col.tasks = action.payload;
        }
      });
    },
    reorderColumnList(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = action.payload;
    },
    createNewTask(state, action: PayloadAction<TaskDraftInterface[]>) {
      state.columns.forEach((col) => {
        if (col.id === state.column.id) {
          col.tasks = [...col.tasks, ...action.payload];
        }
      });
    },
    setColumn(state, action: PayloadAction<ColumnInterface>) {
      state.column = action.payload;
    },
    createNewColumn(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = [...state.columns, ...action.payload];
    },
    deleteTask(state, action: PayloadAction<string | undefined>) {
      state.columns.forEach((col) => {
        col.tasks = col.tasks.filter((task) => task.id !== action.payload);
      });
    },
  },
});

export default boardsSlice.reducer;
