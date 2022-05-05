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
    id?: number;
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

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 350,
        backgroundColor: '#C4C4C4',
        paddingBottom: '1rem',
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate(`/board/:${board.id}`);
        }}
      >
        <CardHeader
          title={board.name}
          style={{
            background:
              'linear-gradient(56deg, rgba(37,197,168,1) 28%, rgba(172,197,37,1) 66%, rgba(227,102,85,1) 100%',
            color: '#fff',
          }}
        />
        <CardContent>
          <Typography variant="body1">{board.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: '#E36655' }}
          onClick={onClickDeleteBtn}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
