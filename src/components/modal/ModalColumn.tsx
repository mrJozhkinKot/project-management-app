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
import { useParams } from 'react-router-dom';
import { createColumnThunk } from '../../reducers/ActionBoardsCreater';
import { createColumn } from '../../utils/serverAPI';

const defaultValues = {
  title: '',
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

const ModalColumn = () => {
  const [valueText, setValueText] = useState('');
  const { setIsModalColumn, createNewColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isModalColumn, columns } = useAppSelector((state) => state.boardsReducer);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });

  const handleClose = () => {
    dispatch(setIsModalColumn(false));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = () => {
    dispatch(createNewColumn([{ id: String(new Date()), title: valueText, order: 1, tasks: [] }]));
    if (id) {
      dispatch(createColumnThunk([id, { title: valueText, order: columns.length }]));
    }
    handleClose();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={isModalColumn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new column:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="descrtption_input"
                label="new column"
                sx={style.input}
                {...register('title', { required: 'Enter the description' })}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueText(event.target.value);
                }}
              />
              <Button type="submit" variant="contained" size="small" style={style.btn}>
                CREATE
              </Button>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ModalColumn;
