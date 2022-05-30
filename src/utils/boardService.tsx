import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  BoardDraftInterface,
  BoardInterface,
  ColumnBodyInterface,
  ColumnDraftInterface,
  TaskCreateBodyInterface,
  TaskInterface,
  UserInterface,
} from './interfaces';

export const boardsAPI = createApi({
  reducerPath: 'boardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evening-lowlands-03074.herokuapp.com' }),
  tagTypes: ['Boards', 'Columns', 'Tasks', 'Users'],
  endpoints: (build) => ({
    getBoards: build.query<BoardDraftInterface[] | null, string>({
      query: (token) => ({
        url: '/boards',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Boards'],
    }),

    getBoard: build.query<BoardInterface | null, string[]>({
      query: ([token, boardID]) => ({
        url: `/boards/${boardID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Boards', 'Columns', 'Tasks'],
    }),

    createBoard: build.mutation<
      BoardDraftInterface | null,
      [string, { title: string; description: string }]
    >({
      query: ([token, title]) => ({
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
    }),

    deleteBoard: build.mutation<null, string[]>({
      query: ([token, boardID]) => ({
        url: `/boards/${boardID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Boards'],
    }),

    getColumns: build.query<ColumnDraftInterface[] | null, string[]>({
      query: ([token, boardID]) => ({
        url: `/boards/${boardID}/columns`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Columns'],
    }),

    createColumn: build.mutation<
      ColumnDraftInterface | null,
      [string, string, ColumnBodyInterface]
    >({
      query: ([token, boardID, column]) => ({
        url: `/boards/${boardID}/columns`,
        method: 'POST',
        body: column,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Boards', 'Columns'],
    }),

    deleteColumn: build.mutation<null, string[]>({
      query: ([token, boardID, columnID]) => ({
        url: `/boards/${boardID}/columns/${columnID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Boards', 'Columns'],
    }),

    updateColumn: build.mutation<
      ColumnDraftInterface | null,
      [string, string, ColumnDraftInterface]
    >({
      query([token, boardID, column]) {
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
      invalidatesTags: ['Boards', 'Columns'],
    }),

    getTasks: build.query<TaskInterface[] | null, string[]>({
      query: ([token, boardID, columnID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks'],
    }),

    getTask: build.query<TaskInterface | null, string[]>({
      query: ([token, boardID, columnID, taskID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks${taskID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Users'],
    }),

    createTasks: build.mutation<
      TaskInterface | null,
      [string, string, string, TaskCreateBodyInterface]
    >({
      query: ([token, boardID, columnID, task]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks`,
        method: 'POST',
        body: task,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Boards', 'Columns', 'Tasks'],
    }),

    deleteTask: build.mutation<null, string[]>({
      query: ([token, boardID, columnID, taskID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Boards', 'Columns', 'Tasks'],
    }),

    updateTask: build.mutation<TaskInterface | null, [string, string, string, TaskInterface]>({
      query([token, boardID, columnID, task]) {
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
      invalidatesTags: ['Boards', 'Columns', 'Tasks'],
    }),

    getUsers: build.query<UserInterface[] | null, string>({
      query: (token) => ({
        url: `/users`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Users'],
    }),

    getUser: build.query<UserInterface | null, string[]>({
      query: ([token, userID]) => ({
        url: `users/${userID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
