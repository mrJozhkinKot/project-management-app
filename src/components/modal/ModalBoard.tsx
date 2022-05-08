import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useState } from 'react';

const style = {
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #61ba8d',
    boxShadow: 24,
    p: 4,
  },
  input: {
    margin: '0.5rem 0',
    width: 400,
    border: '1px solid #61ba8d',
  },
  btn: {
    backgroundColor: '#61ba8d',
    display: 'block',
    padding: '0.5rem',
  },
};

const ModalBoard = () => {
  const [valueName, setValueName] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const { setIsModalBoard, createNewBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isModalBoard } = useAppSelector((state) => state.boardsReducer);

  const handleClose = () => {
    dispatch(setIsModalBoard(false));
  };

  const onClickCreateBoard = () => {
    dispatch(createNewBoard([{ id: new Date(), name: valueName, description: valueDescription }]));
    handleClose();
    setValueName('');
    setValueDescription('');
  };

  return (
    <div>
      <Modal
        open={isModalBoard}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.box}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new board:
          </Typography>
          <TextField
            id="name_input"
            label="Enter name"
            multiline
            rows={1}
            style={style.input}
            value={valueName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValueName(event.target.value);
            }}
          />
          <TextField
            id="descrtption_input"
            label="Enter description"
            multiline
            rows={4}
            style={style.input}
            value={valueDescription}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValueDescription(event.target.value);
            }}
          />
          <Button variant="contained" size="small" style={style.btn} onClick={onClickCreateBoard}>
            CREATE
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBoard;
