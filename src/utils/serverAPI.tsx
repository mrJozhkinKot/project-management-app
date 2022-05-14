import {
  UserInterface,
  SignInResponseInterface,
  SignUpBodyInterface,
  SignInBodyInterface,
  UpdateUserInterface,
  BadRequestInterface,
  InternalServerErrorInterface,
  BoardDraftInterface,
  BoardInterface,
  ColumnBodyInterface,
  ColumnDraftInterface,
  ColumnInterface,
  TaskCreateBodyInterface,
  TaskUpdateBodyInterface,
  TaskInterface,
} from './interfaces';

// TODO: Add 401 error everywhere

const remoteServerURL = 'https://serene-inlet-66010.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYTY5ZDllYi1iYmUxLTQ5ZWYtOTYyOC01YTQ5NDE3NDQwNTQiLCJsb2dpbiI6InRlc3QyIiwiaWF0IjoxNjUyNTQzOTQ2fQ.WJtIq6IU1ha2nXVOVnusrbhRTUxvtjPjjd4l-mXx4dw';

export async function getUsers(): Promise<UserInterface[] | null> {
  const response: Response = await fetch(`${remoteServerURL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getUsers()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);
}

export async function getUser(userID: string): Promise<UserInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getUser()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Incorrect userID');
  }
}

export async function deleteUser(userID: string): Promise<null> {
  const response: Response = await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on deleteUser()');
    return Promise.reject(data);
  }
  console.log('User deleted successfully!');
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('User was not found! : ', data);
  }
}

export async function updateUser(
  userID: string,
  body: UserInterface
): Promise<UpdateUserInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on updateUser()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('User was not found (invalid ID)!');
  }
  if (response.status === 500) {
    console.log('User login already exists!');
  }
}

export async function signUp(body: SignUpBodyInterface): Promise<UserInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on signUp()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);
}

export async function signIn(body: SignInBodyInterface): Promise<SignInResponseInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on signIn()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);
}

export async function getBoards(): Promise<BoardDraftInterface[] | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getBoards()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);
}

export async function getBoard(boardID: string): Promise<BoardInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getBoard()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Incorrect boardID');
  }
}

export async function createBoard(title: string): Promise<BoardDraftInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on createBoard()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);
}

export async function deleteBoard(boardID: string): Promise<InternalServerErrorInterface | void> {
  const response: Response = await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on deleteBoard()');
    return Promise.reject(data);
  }
  console.log('Board deleted successfully!');
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Board was not found! : ', data);
  }
}

export async function updateBoard(
  boardID: string,
  title: string
): Promise<BoardDraftInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on updateBoard()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Board was not found (invalid ID)!');
  }
}

export async function getColumns(boardID: string): Promise<ColumnDraftInterface[] | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards/${boardID}/columns`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getColumns()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID!');
    console.log('data:BadRequestInterface : ', data);
  }
}

export async function getColumn(
  boardID: string,
  columnID: string
): Promise<ColumnInterface | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getColumn()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID!');
  }
}

export async function createColumn(
  boardID: string,
  body: ColumnBodyInterface
): Promise<ColumnDraftInterface | null> {
  const response: Response = await fetch(`${remoteServerURL}/boards/${boardID}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on createColumn()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 500) {
    console.log('Column with this order № already exists!');
    console.log('data:InternalServerErrorInterface : ', data);
  }
}

export async function deleteColumn(boardID: string, columnID: string): Promise<null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}`,
    {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on deleteColumn()');
    return Promise.reject(data);
  }
  console.log('Column deleted successfully!');
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Column or Board id was not found! : ', data);
  }
}

export async function updateColumn(
  boardID: string,
  columnID: string,
  body: ColumnBodyInterface
): Promise<BoardDraftInterface | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on updateColumn()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Board or Column was not found (invalid ID)!');
  }
  if (response.status === 500) {
    console.log('This order was already used before!');
  }
}

export async function getTasks(boardID: string, columnID: string): Promise<TaskInterface[] | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getTasks()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID or columnID!');
    console.log('data:BadRequestInterface : ', data);
  }
}

export async function getTask(
  boardID: string,
  columnID: string,
  taskID: string
): Promise<TaskInterface | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on getTask()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID, columnID or taskID!');
  }
}

export async function createTask(
  boardID: string,
  columnID: string,
  body: TaskCreateBodyInterface
): Promise<TaskInterface | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on createTask()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID, columnID or ITaskCreateBody!');
  }
  if (response.status === 500) {
    console.log('Invalid userID!');
  }
}

export async function deleteTask(boardID: string, columnID: string, taskID: string): Promise<null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
    {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on deleteTask()');
    return Promise.reject(data);
  }
  console.log('Task deleted successfully!');
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('boardID, columnID or taskID was not found! : ', data);
  }
}

export async function updateTask(
  boardID: string,
  columnID: string,
  taskID: string,
  body: TaskUpdateBodyInterface
): Promise<TaskInterface | null> {
  const response: Response = await fetch(
    `${remoteServerURL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    console.log('Something has gone wrong on updateTask()');
    return Promise.reject(data);
  }
  return Promise.resolve(data);

  if (response.status === 400 || response.status === 404) {
    console.log('Invalid boardID, columnID or taskID!');
  }
  if (response.status === 500) {
    console.log('There is wrong data in ITaskUpdateBody (probably userId/boardId/columnId)!');
  }
}

// Not ready
export async function uploadFile(
  taskID: string,
  file: File
): Promise<string | InternalServerErrorInterface | void> {
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
      } else if (!response.ok) {
        data = await response.json();
        if (response.status === 409) {
          console.log('file already exists or incorrect MIME type');
          console.log('data:InternalServerErrorInterface : ', data);
        } else {
          console.log('Something has gone wrong while uploadFile()');
          console.log('data:InternalServerErrorInterface : ', data);
        }
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

// Not ready
export async function downloadFile(
  taskID: string,
  fileName: string
): Promise<Blob | InternalServerErrorInterface | void> {
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
      } else if (!response.ok) {
        data = await response.json();
        console.log('Something has gone wrong while downloadFile()');
        console.log('data:InternalServerErrorInterface : ', data);
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}
