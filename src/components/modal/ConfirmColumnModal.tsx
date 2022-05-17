import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { columnsAPI } from '../../utils/columnsService';

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
    width: 350,
    bgcolor: '#f0ede9',
    border: '1px solid #20B298',
    boxShadow: 24,
    p: 4,
  },
  message: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#20B298',
    display: 'block',
    padding: '0.3rem 1rem',
    marginTop: '1rem',
  },
};

const ConfirmColumnModal = () => {
  const { setIsConfirmColumnModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isConfirmColumnModal, currentBoardId, currentColumnId } = useAppSelector(
    (state) => state.boardsReducer
  );
  const [deleteColumn, {}] = columnsAPI.useDeleteColumnMutation();

  const handleClose = () => {
    dispatch(setIsConfirmColumnModal(false));
  };

  const onClickConfirmDeleteBtn = () => {
    deleteColumn([currentBoardId, currentColumnId]);
    dispatch(setIsConfirmColumnModal(false));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={isConfirmColumnModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={style.message}>
              Delete this column with all tasks?
            </Typography>
            <div style={style.btnContainer}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={style.btn}
                onClick={() => {
                  dispatch(setIsConfirmColumnModal(false));
                }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ ...style.btn, backgroundColor: '#E36655' }}
                onClick={onClickConfirmDeleteBtn}
              >
                DELETE
              </Button>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ConfirmColumnModal;
