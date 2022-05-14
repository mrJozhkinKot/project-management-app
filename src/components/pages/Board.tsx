import Button from '@mui/material/Button';
import React, { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import ColumnList from '../boards/ColumnList';
import ModalColumn from '../modal/ModalColumn';
import ModalEditTask from '../modal/ModalEditTask';
import ModalTask from '../modal/ModalTask';
import { getColumnsThunk, getTasksThunk } from '../../reducers/ActionBoardsCreater';
import { useParams } from 'react-router-dom';

const Board: React.FC = () => {
  const { setIsModalColumn, setColumns } = boardsSlice.actions;
  const { columnsDraft, tasksDraft, task, columns } = useAppSelector(
    (state) => state.boardsReducer
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getColumnsThunk(id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(
        setColumns(
          columnsDraft.map((col) => {
            dispatch(getTasksThunk([id, col.id]));
            return { ...col, tasks: tasksDraft };
          })
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={style}
        onClick={() => {
          dispatch(setIsModalColumn(true));
        }}
      >
        Create Column
      </Button>
      <ColumnList />
      <ModalColumn />
      <ModalTask />
      <ModalEditTask />
    </Fragment>
  );
};

export default Board;
