import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id?: string;
  name?: string;
  description?: string;
}
interface TaskDraftInterface {
  id: string;
  title: string;
  order?: number;
  description?: string;
  userId?: string;
  files?: FileInterface[];
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}

interface Column {
  id: string;
  title: string;
  order: number;
  tasks: TaskDraftInterface[];
}
interface BoardsState {
  boards: Board[];
  board: Board;
  columns: Column[];
  column: Column;
  task: TaskDraftInterface;
  isModalBoard: boolean;
  isModalTask: boolean;
  isModalColumn: boolean;
}

const initialState: BoardsState = {
  boards: [],
  board: {},
  columns: [
    {
      id: '12323',
      title: 'column1',
      order: 0,
      tasks: [
        { id: '1', title: 'task1' },
        { id: '2', title: 'task2' },
        { id: '3', title: 'task3' },
        { id: '4', title: 'task4' },
      ],
    },
    {
      id: '34434',
      title: 'column2',
      order: 1,
      tasks: [
        { id: '11', title: 'task11' },
        { id: '12', title: 'task12' },
        { id: '13', title: 'task13' },
        { id: '14', title: 'task14' },
      ],
    },
    {
      id: '35535',
      title: 'column3',
      order: 2,
      tasks: [
        { id: '21', title: 'task21' },
        { id: '22', title: 'task22' },
        { id: '23', title: 'task23' },
        { id: '24', title: 'task24' },
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
    id: '0',
    title: '',
  },
  isModalBoard: false,
  isModalTask: false,
  isModalColumn: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    deleteBoard(state, action: PayloadAction<string | undefined>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    setIsModalBoard(state, action: PayloadAction<boolean>) {
      state.isModalBoard = action.payload;
    },
    setIsModalTask(state, action: PayloadAction<boolean>) {
      state.isModalTask = action.payload;
    },
    setIsModalColumn(state, action: PayloadAction<boolean>) {
      state.isModalColumn = action.payload;
    },
    createNewBoard(state, action: PayloadAction<Board[]>) {
      state.boards = [...state.boards, ...action.payload];
    },
    reorderTaskList(state, action: PayloadAction<TaskDraftInterface[]>) {
      state.columns.forEach((col) => {
        if (col.id === state.column.id) {
          col.tasks = action.payload;
        }
      });
    },
    reorderColumnList(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    createNewTask(state, action: PayloadAction<TaskDraftInterface[]>) {
      state.columns.forEach((col, index) => {
        if (col.id === state.column.id) {
          console.log(index);
          console.log(col.id);
          col.tasks = [...col.tasks, ...action.payload];
        }
      });
    },
    setColumn(state, action: PayloadAction<Column>) {
      state.column = action.payload;
    },
    createNewColumn(state, action: PayloadAction<Column[]>) {
      state.columns = [...state.columns, ...action.payload];
    },
  },
});

export default boardsSlice.reducer;
