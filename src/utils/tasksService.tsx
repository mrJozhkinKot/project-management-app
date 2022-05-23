import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TaskCreateBodyInterface, TaskInterface } from './interfaces';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODMyMmM1OS1iNjNjLTRkM2UtODhmMC0zOTNkNzBmMzgyYjMiLCJsb2dpbiI6InVzZXIxMjMiLCJpYXQiOjE2NTI1NDQyMzN9.XM3L7iV1UxgDjnuM0vBCpBwO-BtWANB4M8RBo2O8bFo';

export const tasksAPI = createApi({
  reducerPath: 'tasksAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evening-lowlands-03074.herokuapp.com' }),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    getTasks: build.query<TaskInterface[] | null, string[]>({
      query: ([boardID, columnID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks'],
    }),
    getTask: build.query<TaskInterface | null, string[]>({
      query: ([boardID, columnID, taskID]) => ({
        url: `/boards/${boardID}/columns/${columnID}/tasks${taskID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Tasks'],
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
      invalidatesTags: ['Tasks'],
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
      invalidatesTags: ['Tasks'],
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
      invalidatesTags: ['Tasks'],
    }),
  }),
});
