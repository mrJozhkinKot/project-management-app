import { Slide, toast } from 'react-toastify';
import { ParsedErrorInterface } from '../../utils/interfaces';

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
        notifyBoardsWarning('Board ID was not found!');
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'columns':
      if (error.status === 400 || error.status === 404) {
        notifyBoardsWarning('Board ID was not found!');
      }
      if (error.status === 500) {
        notifyBoardsWarning('This column order already exists!');
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'tasks':
      if (error.status === 400 || error.status === 404) {
        notifyBoardsWarning('Invalid ID (board, column or task) or task body!');
      }
      if (error.status === 500) {
        notifyBoardsWarning('Error in task create/update body!');
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    case 'files':
      if (error.status === 409) {
        notifyBoardsWarning('File already exists or incorrect MIME type!');
      } else if (error.status < 200 || error.status >= 300) {
        notifyBoardsWarning(data.message);
      }
      break;
    default:
      break;
  }
}
