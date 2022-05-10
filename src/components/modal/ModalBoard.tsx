import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material';

const defaultValues = {
  name: '',
  description: '',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#E36655',
    },
  },
});

const style = {
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#f0ede9',
    border: '1px solid #20B298',
    boxShadow: 24,
    p: 4,
  },
  input: {
    margin: '0.5rem 0',
    width: 450,
    '& .focus': {
      borderColor: 'orange',
    },
  },
  btn: {
    backgroundColor: '#20B298',
    display: 'block',
    padding: '0.5rem 1rem',
    marginTop: '1rem',
  },
};

const ModalBoard = () => {
  const [valueName, setValueName] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const { setIsModalBoard, createNewBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isModalBoard } = useAppSelector((state) => state.boardsReducer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isDirty },
  } = useForm({ defaultValues });

  const handleClose = () => {
    dispatch(setIsModalBoard(false));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = () => {
    dispatch(
      createNewBoard([{ id: String(new Date()), name: valueName, description: valueDescription }])
    );
    handleClose();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="name_input"
                label="Enter name"
                {...register('name', { required: 'Enter the name' })}
                multiline
                rows={1}
                sx={style.input}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueName(event.target.value);
                }}
              />
              <TextField
                id="descrtption_input"
                label="Enter description"
                multiline
                rows={4}
                sx={style.input}
                {...register('description', { required: 'Enter the description' })}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueDescription(event.target.value);
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="small"
                style={style.btn}
                disabled={!isDirty}
              >
                CREATE
              </Button>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ModalBoard;
