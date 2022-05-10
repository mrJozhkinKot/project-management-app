import React, { useCallback } from 'react';
import update from 'immutability-helper';
import Grid from '@mui/material/Grid';
import Column from './Column';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface Column {
  id: string;
  title: string;
  order: number;
  tasks: TaskDraftInterface[];
}
interface TaskDraftInterface {
  id: string;
  title: string;
  order?: number;
  description?: string;
  userId?: string;
  files?: FileInterface[];
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.boardsReducer);
  const { reorderColumnList } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        reorderColumnList(
          update(columns, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, columns[dragIndex] as Column],
            ],
          })
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );

  return (
    <div>
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {columns.map((column, index) => (
          <Grid key={Number(column.id)} item xs={12} sm={6} md={4} lg={3}>
            <Column column={column} index={index} moveColumn={moveColumn} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ColumnList;
