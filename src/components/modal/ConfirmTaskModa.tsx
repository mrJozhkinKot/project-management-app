import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { tasksAPI } from '../../utils/tasksService';
import { useTranslation } from 'react-i18next';

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

const ConfirmTaskModal = () => {
  const { setIsConfirmTaskModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isConfirmTaskModal, currentBoardId, currentColumnId, currentTaskId } = useAppSelector(
    (state) => state.boardsReducer
  );
  const [deleteTask, {}] = tasksAPI.useDeleteTaskMutation();
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(setIsConfirmTaskModal(false));
  };

  const onClickConfirmDeleteBtn = () => {
    deleteTask([currentBoardId, currentColumnId, currentTaskId]);
    dispatch(setIsConfirmTaskModal(false));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={isConfirmTaskModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={style.message}>
              {t('delete_this_board_with_all_columns')}?
            </Typography>
            <div style={style.btnContainer}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={style.btn}
                onClick={() => {
                  dispatch(setIsConfirmTaskModal(false));
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ ...style.btn, backgroundColor: '#E36655' }}
                onClick={onClickConfirmDeleteBtn}
              >
                {t('delete')}
              </Button>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ConfirmTaskModal;
