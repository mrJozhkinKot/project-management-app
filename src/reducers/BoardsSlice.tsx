import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  BoardDraftInterface,
  ColumnInterface,
  TaskDraftInterface,
  TaskInterface,
} from '../utils/interfaces';
import { createBoardThunk, getBoardsThunk, deleteBoardThunk } from './ActionBoardsCreater';

interface BoardsState {
  boards: BoardDraftInterface[];
  board: BoardDraftInterface;
  columns: ColumnInterface[];
  column: ColumnInterface;
  task: TaskInterface;
  isLoading: boolean;
  isModalBoard: boolean;
  isModalTask: boolean;
  isModalEditTask: boolean;
  isModalColumn: boolean;
}

const initialState: BoardsState = {
  boards: [],
  board: {
    id: '',
    title: '',
  },
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
  task: {
    id: '',
    title: '',
    description: '',
    order: 0,
    userId: '',
    files: [],
    boardId: '',
    columnId: '',
  },
  isLoading: false,
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
    createNewColumn(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = [...state.columns, ...action.payload];
    },
    deleteTask(state, action: PayloadAction<string | undefined>) {
      state.columns.forEach((col) => {
        col.tasks = col.tasks.filter((task) => task.id !== action.payload);
      });
    },
    setColumns(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = action.payload;
    },
    setColumn(state, action: PayloadAction<ColumnInterface>) {
      state.column = action.payload;
    },
    setTask(state, action: PayloadAction<TaskInterface>) {
      state.task = action.payload;
    },
  },
  extraReducers: {
    [createBoardThunk.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.board = { ...state.board, title: action.payload };
    },
    [createBoardThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createBoardThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getBoardsThunk.fulfilled.type]: (state, action: PayloadAction<BoardDraftInterface[]>) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [getBoardsThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoardsThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteBoardThunk.fulfilled.type]: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    [deleteBoardThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteBoardThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default boardsSlice.reducer;
