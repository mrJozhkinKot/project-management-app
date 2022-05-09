export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUpdateUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface ISignUpBody {
  name: string;
  login: string;
  password: string;
}

export interface ISignInBody {
  login: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
}

export interface IBadRequest {
  statusCode: number;
  message: string;
  error: string;
}

export interface IInternalServerError {
  statusCode: number;
  message: string;
}

export interface IBoardDraft {
  id: string;
  title: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IColumnBody {
  title: string;
  order: number;
}

export interface IColumnDraft {
  id: string;
  title: string;
  order: number;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITaskDraft[];
}

export interface ITaskCreateBody {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface ITaskDraft {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: IFile[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFile[];
}

export interface ITaskUpdateBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IFile {
  filename: string;
  fileSize: number;
}
