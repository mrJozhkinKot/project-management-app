import {
  IUser,
  ISignInResponse,
  ISignUpBody,
  IUpdateUser,
  IBadRequest,
  IInternalServerError,
} from './interfaces';

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
        console.log('data:IUser : ', data);
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
        console.log('data:IBadRequest : ', data);
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
      if (response.status === 409) {
        console.log('User login already exists!');
        console.log('data:IInternalServerError : ', data);
      }
      if (response.status === 400) {
        console.log('Found empty field!');
        console.log('data:IBadRequest : ', data);
      }

      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}
