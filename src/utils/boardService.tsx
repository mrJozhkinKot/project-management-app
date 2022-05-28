import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  BoardDraftInterface,
  ColumnBodyInterface,
  ColumnDraftInterface,
  TaskCreateBodyInterface,
  TaskInterface,
  UserInterface,
} from './interfaces';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmM5NGQwZC05Y2RhLTQ0N2UtOTlmMS1jZGNmOWM5NGFjYmUiLCJsb2dpbiI6InVzZXIwMDciLCJpYXQiOjE2NTMzMDkzNTR9.IYK-KOHLPDJx7C8gNmE5FAzvTmvXKIr2Gd4OZZ95wVI';

export const boardsAPI = createApi({
  reducerPath: 'boardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evening-lowlands-03074.herokuapp.com' }),
  tagTypes: ['Boards', 'Columns', 'Tasks', 'Users'],
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
    createBoard: build.mutation<BoardDraftInterface | null, { title: string; description: string }>(
      {
        query: (title) => ({
          url: '/boards',
          method: 'POST',
          body: title,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        invalidatesTags: ['Boards'],
      }
    ),
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
    getTasks: build.query<TaskInterface[] | null, string[]>({
      query: ([boardID, columnID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks', 'Users'],
    }),
    getTask: build.query<TaskInterface | null, string[]>({
      query: ([boardID, columnID, taskID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks${taskID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks', 'Users'],
    }),
    createTasks: build.mutation<TaskInterface | null, [string, string, TaskCreateBodyInterface]>({
      query: ([boardID, columnID, task]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks`,
        method: 'POST',
        body: task,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Tasks', 'Users'],
    }),
    deleteTask: build.mutation<null, string[]>({
      query: ([boardID, columnID, taskID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Tasks', 'Users'],
    }),
    updateTask: build.mutation<null, [string, string, TaskInterface]>({
      query([boardID, columnID, task]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, files, ...body } = task;
        return {
          url: `/boards/${boardID}/columns/${columnID}/tasks/${id}`,
          method: 'PUT',
          body: body,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Tasks', 'Users'],
    }),
    getUsers: build.query<UserInterface[] | null, number>({
      query: (limit) => ({
        url: `/users`,
        params: {
          _limit: limit,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks', 'Users'],
    }),
    getUser: build.query<UserInterface | null, string>({
      query: (userID) => ({
        url: `users/${userID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks', 'Users'],
    }),
  }),
});
