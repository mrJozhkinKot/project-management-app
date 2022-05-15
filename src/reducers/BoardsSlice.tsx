import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  BoardDraftInterface,
  ColumnInterface,
  ColumnDraftInterface,
  TaskDraftInterface,
  TaskInterface,
} from '../utils/interfaces';

interface BoardsState {
  boards: BoardDraftInterface[];
  board: BoardInterface;
  columns: ColumnInterface[];
  columnsDraft: ColumnDraftInterface[];
  column: ColumnInterface;
  task: TaskInterface;
  tasksDraft: TaskDraftInterface[];
  currentColumnId: string;
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
    columns: [],
  },
  columnsDraft: [],
  columns: [],
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
  tasksDraft: [],
  currentColumnId: '',
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
    setCurrentColumnId(state, action: PayloadAction<string>) {
      state.currentColumnId = action.payload;
    },
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
});

export default boardsSlice.reducer;
