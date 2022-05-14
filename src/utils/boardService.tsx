import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BoardDraftInterface } from './interfaces';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODMyMmM1OS1iNjNjLTRkM2UtODhmMC0zOTNkNzBmMzgyYjMiLCJsb2dpbiI6InVzZXIxMjMiLCJpYXQiOjE2NTI1NDQyMzN9.XM3L7iV1UxgDjnuM0vBCpBwO-BtWANB4M8RBo2O8bFo';

export const boardsAPI = createApi({
  reducerPath: 'boardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-inlet-66010.herokuapp.com' }),
  tagTypes: ['Boards'],
  endpoints: (build) => ({
    getBoards: build.query<BoardDraftInterface[] | null, number>({
      query: (limit) => ({
        url: '/boards',
        params: {
          _limit: limit,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Boards'],
    }),
    createBoard: build.mutation<BoardDraftInterface | null, { title: string }>({
      query: (title) => ({
        url: '/boards',
        method: 'POST',
        body: title,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: build.mutation<BoardDraftInterface | null, string>({
      query: (boardID) => ({
        url: `/boards/${boardID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});
