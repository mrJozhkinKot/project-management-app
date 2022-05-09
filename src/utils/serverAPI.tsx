import {
  IUser,
  ISignInResponse,
  ISignUpBody,
  ISignInBody,
  IUpdateUser,
  IBadRequest,
  IInternalServerError,
  IBoardDraft,
  IBoard,
  IColumnBody,
  IColumnDraft,
  IColumn,
  ITaskCreateBody,
  ITaskUpdateBody,
  ITask,
} from './interfaces';

// TODO: Add 401 error everywhere

const remoteServerURL = 'https://serene-inlet-66010.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNGQwNWExNy04YTEyLTQwOWMtYjcwZS0xN2Q5ZGFkNzU1Y2UiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE4NzE5MTh9.4pGFpqAg1EqW4ZjVUd0RGViqdmRPlzPN1sigO25zXl8';

export async function getUsers(): Promise<IUser[] | void> {
  await fetch(`${remoteServerURL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IUser[] : ', data);
      } else {
        console.log('Something has gone wrong while getUsers()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getUser(userID: string): Promise<IUser | IBadRequest | void> {
  await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IUser : ', data);
      } else {
        console.log('Something has gone wrong while getUser()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function deleteUser(userID: string): Promise<IBadRequest | void> {
  await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.log('data:IBadRequest : ', data);
        return data;
      } else {
        console.log('User deleted successfully!');
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function updateUser(
  userID: string,
  body: IUser
): Promise<IUpdateUser | IBadRequest | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IUpdateUser : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('User was not found (invalid ID)!');
        console.log('data:IBadRequest : ', data);
      }
      if (response.status === 500) {
        console.log('User login already exists!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while updateUser()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function signUp(
  body: ISignUpBody
): Promise<IUser | IBadRequest | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IUser : ', data);
      }
      if (response.status === 400) {
        console.log('Found empty field!');
        console.log('data:IBadRequest : ', data);
      }
      if (response.status === 409) {
        console.log('User login already exists!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while signUp()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function signIn(
  body: ISignInBody
): Promise<ISignInResponse | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:ISignInResponse : ', data);
      }
      if (response.status === 403) {
        console.log('User was not found or password was wrong!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while signIn()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getBoards(): Promise<IBoardDraft[] | void> {
  await fetch(`${remoteServerURL}/boards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IBoardDraft[] : ', data);
      } else {
        console.log('Something has gone wrong while getBoards()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getBoard(boardID: string): Promise<IBoard | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IBoard : ', data);
      }
      if (response.status === 400) {
        console.log('Incorrect boardID');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while getBoard()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function createBoard(title: string): Promise<IBoardDraft | void> {
  await fetch(`${remoteServerURL}/boards`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IBoardDraft : ', data);
      } else {
        console.log('Something has gone wrong while createBoard()');
        console.log('data:IInternalServerError : ', data);
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function deleteBoard(boardID: string): Promise<IInternalServerError | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.log('data:IInternalServerError : ', data);
        return data;
      } else {
        console.log('Board deleted successfully!');
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function updateBoard(
  boardID: string,
  title: string
): Promise<IBoardDraft | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IBoardDraft : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Board was not found (invalid ID)!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while updateBoard()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getColumns(boardID: string): Promise<IColumnDraft[] | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IColumnDraft : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while getColumns()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getColumn(
  boardID: string,
  columnID: string
): Promise<IColumn | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IColumn : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while getColumn()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function createColumn(
  boardID: string,
  body: IColumnBody
): Promise<IColumnDraft | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IColumnDraft : ', data);
      }
      if (response.status === 500) {
        console.log('Column with this order № already exists!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while createColumn()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function deleteColumn(
  boardID: string,
  columnID: string
): Promise<IInternalServerError | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 || response.status === 404) {
          console.log('Column or Board id was not found!');
          console.log('data:IInternalServerError | IBadRequest : ', data);
        }
        return data;
      } else {
        console.log('Column deleted successfully!');
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function updateColumn(
  boardID: string,
  columnID: string,
  body: IColumnBody
): Promise<IBoardDraft | IInternalServerError | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:IBoardDraft : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Board or Column was not found (invalid ID)!');
        console.log('data:IInternalServerError : ', data);
      }
      if (response.status === 500) {
        console.log('This order was already used before!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while updateColumn()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getTasks(
  boardID: string,
  columnID: string
): Promise<ITask[] | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:ITask[] : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID or columnID!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while getTasks()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function getTask(
  boardID: string,
  columnID: string,
  taskID: string
): Promise<ITask | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:ITask : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID, columnID or taskID!');
        console.log('data:IBadRequest : ', data);
      } else {
        console.log('Something has gone wrong while getTask()');
      }

      return data;
    })
    .catch((error) => {
      throw Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function createTask(
  boardID: string,
  columnID: string,
  body: ITaskCreateBody
): Promise<ITask | IBadRequest | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:ITask : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID, columnID or ITaskCreateBody!');
        console.log('data:IBadRequest : ', data);
      }
      if (response.status === 500) {
        console.log('Invalid userID!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while createTask()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function deleteTask(
  boardID: string,
  columnID: string,
  taskID: string
): Promise<IInternalServerError | IBadRequest | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 || response.status === 404) {
          console.log('boardID, columnID or taskID was not found!');
          console.log('data:IInternalServerError | IBadRequest : ', data);
        }
        return data;
      } else {
        console.log('Task deleted successfully!');
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function updateTask(
  boardID: string,
  columnID: string,
  taskID: string,
  body: ITaskUpdateBody
): Promise<ITask | IBadRequest | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log('data:ITask : ', data);
      }
      if (response.status === 400 || response.status === 404) {
        console.log('Invalid boardID, columnID or taskID!');
        console.log('data:IBadRequest : ', data);
      }
      if (response.status === 500) {
        console.log('There is wrong data in ITaskUpdateBody (probably userId/boardId/columnId)!');
        console.log('data:IInternalServerError : ', data);
      } else {
        console.log('Something has gone wrong while updateTask()');
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function uploadFile(
  taskID: string,
  file: File
): Promise<string | IInternalServerError | void> {
  const formData: FormData = new FormData();
  formData.append('taskId', taskID);
  formData.append('file', file);

  await fetch(`${remoteServerURL}/file`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data', // Not necessary header
    },
    body: formData,
  })
    .then(async (response) => {
      let data;

      if (response.ok) {
        data = await Promise.resolve(response.text());
        console.log('data:string : ', data);
      } else {
        data = await response.json();
        if (response.status === 409) {
          console.log('file already exists or incorrect MIME type');
          console.log('data:IInternalServerError : ', data);
        } else {
          console.log('Something has gone wrong while uploadFile()');
          console.log('data:IInternalServerError : ', data);
        }
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function downloadFile(
  taskID: string,
  fileName: string
): Promise<Blob | IInternalServerError | void> {
  await fetch(`${remoteServerURL}/file/${taskID}/${fileName}`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      let data;

      if (response.ok) {
        data = await response.blob();
        console.log('data:Blob : ', data);
      } else {
        data = await response.json();
        console.log('Something has gone wrong while downloadFile()');
        console.log('data:IInternalServerError : ', data);
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}
