import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';
import Column from './Column';
import { ColumnInterface, TaskDraftInterface } from '../../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';

const ColumnList = () => {
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.globalReducer);
  const { data: columns, isLoading } = boardsAPI.useGetColumnsQuery([token, id as string]);
  const { data: board } = boardsAPI.useGetBoardQuery([token, id as string]);
  const [updateTask, {}] = boardsAPI.useUpdateTaskMutation();
  const [updateColumn, {}] = boardsAPI.useUpdateColummnMutation();
  const [createTask, {}] = boardsAPI.useCreateTasksMutation();
  const [deleteTask, {}] = boardsAPI.useDeleteTaskMutation();

  const { localColumns } = useAppSelector((state) => state.boardsReducer);
  const { setLocalColumns } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    board && board?.columns.length !== 0 && setShouldRender(true);
  }, [board]);

  useEffect(() => {
    board && shouldRender && dispatch(setLocalColumns(board?.columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, shouldRender]);

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    const colSource = localColumns?.filter((col: ColumnInterface) => col.id === sInd)[0];
    const colDestination = localColumns?.filter((col: ColumnInterface) => col.id === dInd)[0];
    const reorderedTasks = colSource?.tasks
      ? reorder(
          colSource?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
          source.index,
          destination.index
        )
      : [];

    const delArrOfTasks =
      colDestination?.tasks && colSource?.tasks.map((task) => task).splice(source.index, 1);

    const addedArrOfTasks =
      colDestination?.tasks && colSource?.tasks
        ? move(
            colSource?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            colDestination?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            source,
            destination
          )
        : [];

    const reorderedColumns = columns
      ? reorderColumns(
          localColumns?.map((col) => col).sort((a, b) => (a.order > b.order ? 1 : -1)),
          source.index,
          destination.index
        )
      : [];

    if (localColumns && type === 'list') {
      dispatch(
        setLocalColumns(
          reorderedColumns
            .map((col, index) => ({ ...col, order: index + 1 }))
            .sort((a, b) => (a.order > b.order ? 1 : -1))
        )
      );
      localColumns
        .map((col) => col)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((col, index) => {
          updateColumn([
            token,
            id as string,
            {
              id: col.id,
              title: col.title,
              order: reorderedColumns[index].order,
            },
          ]);
        });
    } else {
      if (sInd === dInd) {
        dispatch(
          setLocalColumns(
            localColumns.map((col) =>
              col.id === colSource.id
                ? {
                    ...col,
                    tasks: reorderedTasks
                      .map((task, index) => ({ ...task, order: index + 1 }))
                      .sort((a, b) => (a.order > b.order ? 1 : -1)),
                  }
                : col
            )
          )
        );
        colSource?.tasks
          .map((task) => task)
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map((task, index) => {
            updateTask([
              token,
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
        dispatch(
          setLocalColumns(
            localColumns.map((col) => {
              if (col.id === colDestination.id) {
                return { ...col, tasks: addedArrOfTasks };
              } else if (col.id === colSource.id) {
                return { ...col, tasks: delArrOfTasks };
              } else {
                return col;
              }
            })
          )
        );
        colSource?.tasks
          .map((task) => task)
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map((task, index) => {
            if (index === source.index) {
              deleteTask([token, id as string, colSource.id as string, task.id]);
            }
          });
        colDestination?.tasks
          .map((task) => task)
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map((task, index) => {
            updateTask([
              token,
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
          token,
          id as string,
          colDestination?.id as string,
          {
            title: addedArrOfTasks[addedArrOfTasks.length - 1].title,
            description: addedArrOfTasks[addedArrOfTasks.length - 1].description,
            userId: addedArrOfTasks[addedArrOfTasks.length - 1].userId,
          },
        ]);
      }
    }
  };

  const reorderColumns = (
    columns: ColumnInterface[],
    startIndex: number,
    endIndex: number
  ): ColumnInterface[] => {
    const result = Array.from(columns);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
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
        {isLoading && <Spinner />}
        {!isLoading && (
          <Droppable droppableId="columnList" direction="horizontal" type="list">
            {(provided) => (
              <Grid
                sx={style.container}
                container
                spacing={4}
                pl={4}
                pr={4}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {shouldRender &&
                  localColumns &&
                  localColumns
                    .map((task) => task)
                    .sort((a, b) => (a.order > b.order ? 1 : -1))
                    .map((column, index) => (
                      <Grid key={String(column.id)} item xs={12} sm={6} md={4} lg={3}>
                        <Column column={column} index={index} />
                      </Grid>
                    ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
};

export default ColumnList;
