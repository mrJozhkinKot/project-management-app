import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';

interface Props {
  board: {
    id?: number | Date;
    name?: string;
    description?: string;
  };
}

const Board: React.FC<Props> = ({ board }) => {
  const { deleteBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
  };

  return (
    <Card sx={{ minWidth: 275 }} style={style.card}>
      <CardActionArea
        onClick={() => {
          navigate(`/boards/:${board.id}`);
        }}
      >
        <CardHeader title={board.name} />
        <CardContent>
          <Typography variant="body1">{board.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" style={style.btn} onClick={onClickDeleteBtn}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
