export interface IUser {
  id: string;
  name: string;
  login: string;
}

export type IGetUsers = IUser[];

export interface IUpdateUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface ISignIn {
  token: string;
}

export type ISignUp = IUser;

export interface IBadRequest {
  statusCode: number;
  message: string;
  error: string;
}

export interface IInternalServerError {
  statusCode: number;
  message: string;
}
