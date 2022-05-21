import React, { Fragment } from 'react';
import BoardList from '../boards/BoardList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalBoard from '../modal/ModalBoard';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

const Boards: React.FC = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClickCreateBtn = () => {
    dispatch(setIsModalBoard(true));
  };
  const style = {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  };
  return (
    <Fragment>
      <Box>
        <Button variant="contained" sx={style} onClick={onClickCreateBtn}>
          {t('create_board')}
        </Button>
        <BoardList />
        <ModalBoard />
      </Box>
    </Fragment>
  );
};

export default Boards;
