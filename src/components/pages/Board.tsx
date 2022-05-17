import Button from '@mui/material/Button';
import React, { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import ColumnList from '../boards/ColumnList';
import ModalColumn from '../modal/ModalColumn';
import ModalEditTask from '../modal/ModalEditTask';
import ModalTask from '../modal/ModalTask';
import { getColumnsThunk } from '../../reducers/ActionBoardsCreater';
import { useParams } from 'react-router-dom';
import ConfirmColumnModal from '../modal/ConfirmColumnModal';
import ConfirmTaskModal from '../modal/ConfirmTaskModa';

const Board: React.FC = () => {
  const { setIsModalColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentColumnId, currentTaskId } = useAppSelector((state) => state.boardsReducer);

  useEffect(() => {
    if (id) {
      dispatch(getColumnsThunk(id));
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
      {currentColumnId && <ModalTask />}
      {currentColumnId && currentTaskId && <ModalEditTask />}
      <ConfirmColumnModal />
      <ConfirmTaskModal />
    </Fragment>
  );
};

export default Board;
