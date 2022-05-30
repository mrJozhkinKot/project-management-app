import { Slide, toast } from 'react-toastify';
import { ParsedErrorInterface } from '../../utils/interfaces';
import i18n from 'i18next';

export function notifyAuthWarning(message: string) {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    type: toast.TYPE.WARNING,
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: true,
    theme: 'colored',
    icon: '⛔',
  });
}

export function notifyBoardsWarning(message: string) {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    type: toast.TYPE.WARNING,
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: true,
    theme: 'colored',
    icon: '⛔',
  });
}

export function notifySuccess(message: string) {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    type: toast.TYPE.SUCCESS,
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: true,
    theme: 'colored',
  });
}

export function handleBoardsErrors(
  error: ParsedErrorInterface,
  action: 'boards' | 'columns' | 'tasks' | 'files'
) {
  const data = error.data;

  switch (action) {
    case 'boards':
      if (error.status === 400 || error.status === 404) {
        notifyBoardsWarning(i18n.t('board_ID_was_not_found'));
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'columns':
      if (error.status === 400 || error.status === 404) {
        notifyBoardsWarning(i18n.t('board_ID_was_not_found'));
      }
      if (error.status === 500) {
        notifyBoardsWarning(i18n.t('this_column_order_already_exists'));
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'tasks':
      if (error.status === 400 || error.status === 404) {
        notifyBoardsWarning(i18n.t('invalid_ID_or_task_body'));
      }
      if (error.status === 500) {
        notifyBoardsWarning(i18n.t('error_in_task_create/update_body'));
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'files':
      if (error.status === 409) {
        notifyBoardsWarning(i18n.t('file_already_exists_or_incorrect_MIME_type'));
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    default:
      break;
  }
}
