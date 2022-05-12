import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';
import { BoardInterface } from '../../utils/interfaces';
interface Props {
  board: BoardInterface;
}

const Board: React.FC<Props> = ({ board }) => {
  const { deleteBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const onClickDeleteBtn = () => {
    dispatch(deleteBoard(board.id));
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
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
