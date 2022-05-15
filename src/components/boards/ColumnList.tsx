import React, { useCallback } from 'react';
import update from 'immutability-helper';
import Grid from '@mui/material/Grid';
import Column from './Column';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ColumnInterface } from '../../utils/interfaces';
import { columnsAPI } from '../../utils/columnsService';
import { useParams } from 'react-router-dom';

const ColumnList = () => {
  //const { columns, columnsDraft } = useAppSelector((state) => state.boardsReducer);
  const { reorderColumnList } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: columns } = columnsAPI.useGetColumnsQuery(id as string);

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // dispatch(
      //   reorderColumnList(
      //     update(columns, {
      //       $splice: [
      //         [dragIndex, 1],
      //         [hoverIndex, 0, columns[dragIndex] as ColumnInterface],
      //       ],
      //     })
      //   )
      // );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );

  return (
    <div>
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {columns &&
          columns.map((column, index) => (
            <Grid key={String(column.id)} item xs={12} sm={6} md={4} lg={3}>
              <Column column={column} index={index} moveColumn={moveColumn} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ColumnList;
