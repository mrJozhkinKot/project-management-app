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

export interface ISignInResponse {
  token: string;
}

export interface ISignUpBody {
  name: string;
  login: string;
  password: string;
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
