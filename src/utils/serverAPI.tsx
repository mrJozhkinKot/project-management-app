import {
  IUser,
  IGetUsers,
  ISignIn,
  ISignUp,
  IUpdateUser,
  IBadRequest,
  IInternalServerError,
} from './interfaces';

const remoteServerURL = 'https://serene-inlet-66010.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNGQwNWExNy04YTEyLTQwOWMtYjcwZS0xN2Q5ZGFkNzU1Y2UiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE4NzE5MTh9.4pGFpqAg1EqW4ZjVUd0RGViqdmRPlzPN1sigO25zXl8';

export async function getUsers(): Promise<IGetUsers | void> {
  await fetch(`${remoteServerURL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        return data;
      }
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
      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        return data;
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

export async function deleteUser(userID: string): Promise<IBadRequest | void> {
  await fetch(`${remoteServerURL}/users/${userID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        return data;
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
      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        return data;
      }
      if (response.status === 500) {
        const data = await response.json();
        console.log('data:IInternalServerError : ', data);
        console.log('User with this login already exists!');
        return data;
      }
      if (response.status === 400 || response.status === 404) {
        const data = await response.json();
        console.log('data:IBadRequest : ', data);
        console.log('User was not found (invalid ID)!');
        return data;
      }
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}
