import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ColumnBodyInterface, ColumnDraftInterface } from './interfaces';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODMyMmM1OS1iNjNjLTRkM2UtODhmMC0zOTNkNzBmMzgyYjMiLCJsb2dpbiI6InVzZXIxMjMiLCJpYXQiOjE2NTI1NDQyMzN9.XM3L7iV1UxgDjnuM0vBCpBwO-BtWANB4M8RBo2O8bFo';

export const columnsAPI = createApi({
  reducerPath: 'columnsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-inlet-66010.herokuapp.com' }),
  tagTypes: ['Columns'],
  endpoints: (build) => ({
    getColumns: build.query<ColumnDraftInterface[] | null, string>({
      query: (boardID) => ({
        url: `/boards/${boardID}/columns`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Columns'],
    }),
    createColumn: build.mutation<ColumnDraftInterface | null, [string, ColumnBodyInterface]>({
      query: ([boardID, column]) => ({
        url: `/boards/${boardID}/columns`,
        method: 'POST',
        body: column,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Columns'],
    }),
    deleteColumn: build.mutation<ColumnDraftInterface | null, string[]>({
      query: ([boardID, columnID]) => ({
        url: `/boards/${boardID}/columns/${columnID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Columns'],
    }),
    updateColummn: build.mutation<ColumnDraftInterface | null, [string, ColumnDraftInterface]>({
      query([boardID, column]) {
        const { id, ...body } = column;
        return {
          url: `/boards/${boardID}/columns/${id}`,
          method: 'PUT',
          body: body,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Columns'],
    }),
  }),
});
