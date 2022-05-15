import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnInterface, TaskDraftInterface, TaskInterface } from '../utils/interfaces';

interface BoardsState {
  columns: ColumnInterface[];
  column: ColumnInterface;
  task: TaskInterface;
  currentColumnId: string;
  currentTaskId: string;
  isLoading: boolean;
  isColumnEdit: boolean;
  isModalBoard: boolean;
  isModalTask: boolean;
  isModalEditTask: boolean;
  isModalColumn: boolean;
}

const initialState: BoardsState = {
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
  currentColumnId: '',
  currentTaskId: '',
  isLoading: false,
  isColumnEdit: false,
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
