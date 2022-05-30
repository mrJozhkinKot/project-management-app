import React, { useEffect, useState } from 'react';
import { DragDropContext, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';
import Column from './Column';
import { ColumnInterface, ParsedErrorInterface, TaskDraftInterface } from '../../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import { handleBoardsErrors } from '../toasts/toasts';

const ColumnList = () => {
  const [cookies] = useCookies(['token']);
  const { id } = useParams();
  const { data: columns, isLoading } = boardsAPI.useGetColumnsQuery([cookies.token, id as string]);
  const { data: board } = boardsAPI.useGetBoardQuery([cookies.token, id as string]);
  const [updateTask, {}] = boardsAPI.useUpdateTaskMutation();
  const [updateColumn, {}] = boardsAPI.useUpdateColumnMutation();
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
      display: 'flex',
    },
    wrapper: {
      maxHeight: 'calc(100vh - 20rem)',
      display: 'flex',
      flexWrap: 'wrap' as const,
      height: '100%',
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
      colDestination?.tasks && colSource?.tasks
        ? moveDeleted(
            colSource?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            colDestination?.tasks.map((task) => task).sort((a, b) => (a.order > b.order ? 1 : -1)),
            source,
            destination
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
            cookies.token,
            id as string,
            {
              id: col.id,
              title: col.title,
              order: reorderedColumns[index].order,
            },
          ]).catch((error) => {
            const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
            handleBoardsErrors(parsedError, 'columns');
          });
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
              cookies.token,
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
            ]).catch((error) => {
              const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
              handleBoardsErrors(parsedError, 'columns');
            });
          });
      } else {
        dispatch(
          setLocalColumns(
            localColumns.map((col) => {
              if (col.id === colDestination.id) {
                return {
                  ...col,
                  tasks: addedArrOfTasks
                    .map((task) => task)
                    .sort((a, b) => (a.order > b.order ? 1 : -1)),
                };
              } else if (col.id === colSource.id) {
                return {
                  ...col,
                  tasks: delArrOfTasks
                    .map((task) => task)
                    .sort((a, b) => (a.order > b.order ? 1 : -1)),
                };
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
              deleteTask([cookies.token, id as string, colSource.id as string, task.id]).catch(
                (error) => {
                  const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
                  handleBoardsErrors(parsedError, 'columns');
                }
              );
            }
          });
        colDestination?.tasks
          .map((task) => task)
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map((task, index) => {
            updateTask([
              cookies.token,
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
            ]).catch((error) => {
              const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
              handleBoardsErrors(parsedError, 'columns');
            });
          });
        createTask([
          cookies.token,
          id as string,
          colDestination?.id as string,
          {
            title: addedArrOfTasks[addedArrOfTasks.length - 1].title,
            description: addedArrOfTasks[addedArrOfTasks.length - 1].description,
            userId: addedArrOfTasks[addedArrOfTasks.length - 1].userId,
          },
        ]).catch((error) => {
          const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
          handleBoardsErrors(parsedError, 'columns');
        });
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

  const moveDeleted = (
    source: TaskDraftInterface[],
    destination: TaskDraftInterface[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = sourceClone;
    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={style.wrapper}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Droppable droppableId="columnList" direction="horizontal" type="list">
            {(provided) => (
              <Box sx={style.container} {...provided.droppableProps} ref={provided.innerRef}>
                {shouldRender &&
                  localColumns &&
                  localColumns
                    .map((task) => task)
                    .sort((a, b) => (a.order > b.order ? 1 : -1))
                    .map((column, index) => (
                      <Box key={column.id}>
                        <Column column={column} index={index} />
                      </Box>
                    ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
};

export default ColumnList;
