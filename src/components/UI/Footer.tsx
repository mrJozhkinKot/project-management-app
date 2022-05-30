import React from 'react';
import { Container, Grid, Link, SvgIcon, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactComponent as RSSIcon } from '../img/rs_school_js.svg';
import { useTranslation } from 'react-i18next';

const style = {
  footer: {
    backgroundColor: '#323535',
    marginTop: 'auto',
  },
  container: {
    alignItems: 'center',
    color: '#fff',
    padding: '3px 0',
  },
  link: {
    '&:hover': {
      color: '#E36655',
    },
  },
  logo: {
    minWidth: '40px',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '5px',
    padding: '0 5px',
    '&:hover': {
      backgroundColor: '#E36655',
    },
  },
  linkWrapper: {
    '&:not(:last-child)': {
      paddingRight: '15px',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  teammate: {
    display: 'flex',
    alignItems: 'center',
  },
  githubIcon: {
    marginRight: '4px',
  },
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer style={style.footer}>
      <Container maxWidth="xl">
        <Grid container sx={style.container}>
          <Grid item lg={4} sm={3} xs={4} sx={style.listItem}>
            <Link href="https://rs.school/react/" target="_blank" rel="noreferrer">
              <SvgIcon component={RSSIcon} inheritViewBox sx={style.logo} />
            </Link>
          </Grid>
          <Grid container item lg={4} sm={6} xs={4} sx={style.listItem}>
            <Grid item component="span" sx={style.linkWrapper}>
              <Link
                sx={style.link}
                href="https://github.com/mrjozhkinkot"
                target="_blank"
                rel="noreferrer"
                underline="none"
                color="inherit"
              >
                <Typography component="span" variant="body2" sx={style.teammate}>
                  <GitHubIcon fontSize="small" sx={style.githubIcon} />
                  {t('Yulia')}
                </Typography>
              </Link>
            </Grid>
            <Grid item component="span" sx={style.linkWrapper}>
              <Link
                sx={style.link}
                href="https://github.com/insane-idea"
                target="_blank"
                rel="noreferrer"
                underline="none"
                color="inherit"
              >
                <Typography component="span" variant="body2" sx={style.teammate}>
                  <GitHubIcon fontSize="small" sx={style.githubIcon} />
                  {t('Sergey')}
                </Typography>
              </Link>
            </Grid>
            <Grid item component="span" sx={style.linkWrapper}>
              <Link
                sx={style.link}
                href="https://github.com/veru44ia"
                target="_blank"
                rel="noreferrer"
                underline="none"
                color="inherit"
              >
                <Typography component="span" variant="body2" sx={style.teammate}>
                  <GitHubIcon fontSize="small" sx={style.githubIcon} />
                  {t('Vera')}
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid item lg={4} sm={3} xs={4} sx={style.listItem}>
            <Typography component="span" variant="body2">
              © 2022
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
