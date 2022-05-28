import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, SvgIcon, Typography, Button } from '@mui/material';
import { ReactComponent as SadIcon } from '../img/sadsmiley.svg';
import { useNavigate } from 'react-router-dom';

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  buttonContained: {
    backgroundColor: '#20B298',
    color: '#fff',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  },
  icon: {
    fontSize: 60,
    marginBottom: '20px',
    color: '#20B298',
  },
};

function NotFound(): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box sx={style.wrapper}>
      <SvgIcon component={SadIcon} inheritViewBox sx={style.icon} />
      <Typography component="p" variant="h4" display="flex" textAlign="center">
        {t('404_error')}
      </Typography>
      <Button
        variant="contained"
        size="small"
        sx={style.buttonContained}
        onClick={() => navigate(-1)}
      >
        {t('go_back')}
      </Button>
    </Box>
  );
}

export default NotFound;
