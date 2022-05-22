// TODO: Add token from cookies to requests headers automatically
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  SignInBodyInterface,
  SignInResponseInterface,
  SignUpBodyInterface,
  UpdateUserInterface,
  UserInterface,
} from './interfaces';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-inlet-66010.herokuapp.com' }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<UserInterface[] | null, string>({
      query: (token) => ({
        url: '/users',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: build.mutation<UserInterface | null, string[]>({
      query: ([token, userID]) => ({
        url: `/users/${userID}`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUser: build.mutation<UpdateUserInterface | null, [string, string, UserInterface]>({
      query: ([token, userID, body]) => ({
        url: `/users/${userID}`,
        method: 'PUT',
        body: body,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<null, string[]>({
      query: ([token, userID]) => ({
        url: `/users/${userID}`,
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    signUp: build.mutation<UserInterface | null, SignUpBodyInterface>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    signIn: build.mutation<SignInResponseInterface | null, SignInBodyInterface>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // transformResponse: (response: { data: SignInResponseInterface }) => response.data.token,
        // selectFromResult: (data: SignInResponseInterface) => data.token,
        // responseHandler: (response) => response.text(),
      }),
    }),
  }),
});
