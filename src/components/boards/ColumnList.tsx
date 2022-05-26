//import update from 'immutability-helper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { DragDropContext, DraggableLocation } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';
import Column from './Column';
import { ColumnInterface, TaskDraftInterface } from '../../utils/interfaces';

const ColumnList = () => {
  const { id } = useParams();
  const { data: columns, isLoading } = boardsAPI.useGetColumnsQuery(id as string);
  const { data: board } = boardsAPI.useGetBoardQuery(id as string);
  const [updateTask, {}] = boardsAPI.useUpdateTaskMutation();
  const [createTask, {}] = boardsAPI.useCreateTasksMutation();
  const [deleteTask, {}] = boardsAPI.useDeleteTaskMutation();

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    const colSource = board?.columns?.filter((col: ColumnInterface) => col.id === sInd)[0];
    const colDestination = board?.columns?.filter((col: ColumnInterface) => col.id === dInd)[0];
    const reorderedTasks = colSource?.tasks
      ? reorder(
          colSource?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
          source.index,
          destination.index
        )
      : [];

    const addedArrOfTasks =
      colDestination?.tasks && colSource?.tasks
        ? move(
            colSource?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            colDestination?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            source,
            destination
          )
        : [];

    if (sInd === dInd) {
      colSource?.tasks
        .map((task) => task)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((task, index) => {
          updateTask([
            id as string,
            colSource.id as string,
            {
              ...task,
              title: reorderedTasks[index].title,
              description: reorderedTasks[index].description,
              userId: reorderedTasks[index].userId,
              boardId: id as string,
              columnId: colSource.id as string,
            },
          ]);
        });
    } else {
      colSource?.tasks
        .map((task) => task)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((task, index) => {
          if (index === source.index) {
            deleteTask([id as string, colSource.id as string, task.id]);
          }
        });
      colDestination?.tasks
        .map((task) => task)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((task, index) => {
          updateTask([
            id as string,
            colDestination.id as string,
            {
              ...task,
              title: addedArrOfTasks[index].title,
              description: addedArrOfTasks[index].description,
              userId: addedArrOfTasks[index].userId,
              boardId: id as string,
              columnId: colDestination.id as string,
            },
          ]);
        });
      createTask([
        id as string,
        colDestination?.id as string,
        {
          title: addedArrOfTasks[addedArrOfTasks.length - 1].title,
          description: addedArrOfTasks[addedArrOfTasks.length - 1].description,
          userId: addedArrOfTasks[addedArrOfTasks.length - 1].userId,
        },
      ]);
    }
  };

  const reorder = (
    tasks: TaskDraftInterface[],
    startIndex: number,
    endIndex: number
  ): TaskDraftInterface[] => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (
    source: TaskDraftInterface[],
    destination: TaskDraftInterface[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = destClone;
    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div>
          {isLoading && <Spinner />}
          <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
            {columns &&
              columns
                .map((task) => task)
                .sort((a, b) => (a.order > b.order ? 1 : -1))
                .map((column, index) => (
                  <Grid key={String(column.id)} item xs={12} sm={6} md={4} lg={3}>
                    <Column column={column} index={index} />
                  </Grid>
                ))}
          </Grid>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ColumnList;
