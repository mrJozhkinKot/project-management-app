export interface UserInterface {
  id: string;
  name: string;
  login: string;
}

export interface UpdateUserInterface {
  name: string;
  login: string;
  password: string;
}

export interface SignUpBodyInterface {
  name: string;
  login: string;
  password: string;
}

export interface SignInBodyInterface {
  login: string;
  password: string;
}

export interface SignInResponseInterface {
  token: string;
}

export interface BadRequestInterface {
  statusCode: number;
  message: string;
  error?: string;
}

export interface InternalServerErrorInterface {
  statusCode: number;
  message: string;
}

export interface BoardDraftInterface {
  id: string;
  title: string;
  description: string;
}

export interface BoardInterface {
  id: string;
  title: string;
  columns: ColumnInterface[];
}

export interface ColumnBodyInterface {
  title: string;
}

export interface ColumnDraftInterface {
  id: string;
  title: string;
  order: number;
}

export interface ColumnInterface {
  id: string;
  title: string;
  order: number;
  tasks: TaskDraftInterface[];
}

export interface TaskCreateBodyInterface {
  title: string;
  description: string;
  userId: string;
}

export interface TaskDraftInterface {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: FileInterface[];
}

export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: FileInterface[];
}

export interface TaskUpdateBodyInterface {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface FileInterface {
  filename: string;
  fileSize: number;
}
