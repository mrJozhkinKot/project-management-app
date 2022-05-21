import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnDraftInterface, ColumnInterface, TaskInterface } from '../utils/interfaces';

interface BoardsState {
  columns: ColumnInterface[];
  columnEdited: ColumnDraftInterface;
  task: TaskInterface;
  currentBoardId: string;
  currentColumnId: string;
  currentTaskId: string;
  isLoading: boolean;
  isConfirmBoardModal: boolean;
  isConfirmColumnModal: boolean;
  isConfirmTaskModal: boolean;
  isColumnEdit: boolean;
  isModalBoard: boolean;
  isModalTask: boolean;
  isModalEditTask: boolean;
  isModalColumn: boolean;
}

const initialState: BoardsState = {
  columns: [],
  columnEdited: {
    id: '',
    title: '',
    order: 0,
  },
  task: {
    id: '',
    title: '',
    description: '',
    order: 0,
    userId: '',
    boardId: '',
    columnId: '',
  },
  currentBoardId: '',
  currentColumnId: '',
  currentTaskId: '',
  isLoading: false,
  isConfirmBoardModal: false,
  isConfirmColumnModal: false,
  isConfirmTaskModal: false,
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
    setCurrentBoardId(state, action: PayloadAction<string>) {
      state.currentBoardId = action.payload;
    },
    setCurrentColumnId(state, action: PayloadAction<string>) {
      state.currentColumnId = action.payload;
    },
    setCurrentTaskId(state, action: PayloadAction<string>) {
      state.currentTaskId = action.payload;
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
    setIsColumnEdit(state, action: PayloadAction<boolean>) {
      state.isColumnEdit = action.payload;
    },
    setIsConfirmBoardModal(state, action: PayloadAction<boolean>) {
      state.isConfirmBoardModal = action.payload;
    },
    setIsConfirmColumnModal(state, action: PayloadAction<boolean>) {
      state.isConfirmColumnModal = action.payload;
    },
    setIsConfirmTaskModal(state, action: PayloadAction<boolean>) {
      state.isConfirmTaskModal = action.payload;
    },
    // reorderTaskList(state, action: PayloadAction<TaskDraftInterface[]>) {
    //   state.columns.forEach((col) => {
    //     if (col.id === state.column.id) {
    //       col.tasks = action.payload;
    //     }
    //   });
    // },
    reorderColumnList(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = action.payload;
    },
    setColumns(state, action: PayloadAction<ColumnInterface[]>) {
      state.columns = action.payload;
    },
    setColumnEdited(state, action: PayloadAction<ColumnDraftInterface>) {
      state.columnEdited = action.payload;
    },
    setTask(state, action: PayloadAction<TaskInterface>) {
      state.task = action.payload;
    },
  },
});

export default boardsSlice.reducer;
