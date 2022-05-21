import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { BoardDraftInterface } from '../../utils/interfaces';
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from '../../reducers/BoardsSlice';

interface Props {
  board: BoardDraftInterface;
}

const Board: React.FC<Props> = ({ board }) => {
  const { setCurrentBoardId, setIsConfirmBoardModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClickDeleteBtn = () => {
    dispatch(setCurrentBoardId(board.id));
    dispatch(setIsConfirmBoardModal(true));
  };

  const style = {
    card: {
      background: 'linear-gradient(32deg, rgba(69,67,65,1) 23%, rgba(240,237,233,1) 71%)',
      padding: '1rem',
      color: '#fff',
    },
    btn: {
      backgroundColor: '#e86842',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
  };

  return (
    <Card sx={{ minWidth: 275 }} style={style.card}>
      <NavLink to={`${board.id}`} style={style.link}>
        <CardActionArea>
          <CardHeader title={board.title} />
        </CardActionArea>
      </NavLink>
      <CardActions>
        <Button variant="contained" size="small" style={style.btn} onClick={onClickDeleteBtn}>
          {t('delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
