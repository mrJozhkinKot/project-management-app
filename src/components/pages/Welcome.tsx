import { Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment } from 'react';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

theme.typography.h2 = {
  fontSize: '2rem',
  fontWeight: 'normal',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
    fontWeight: 'normal',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    fontWeight: 'normal',
  },
};

theme.typography.h3 = {
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

theme.typography.h5 = {
  fontSize: '1.5rem',
  fontWeight: 'normal',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
    fontWeight: 'normal',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
    fontWeight: 'normal',
  },
};

const style = {
  container: {
    marginTop: { xs: '0.1rem', md: '2rem' },
    marginBottom: { xs: '0.1rem', md: '1.2rem' },
  },
  aboutProject: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5rem',
    paddingLeft: { xs: '0.5rem', md: '1rem' },
    paddingRight: { xs: '0.5rem', md: '1rem' },
  },
  img: {
    display: 'flex',
  },
  aboutCourse: {
    padding: { xs: '0.5rem', md: '1rem' },
  },
};

function Welcome(): React.ReactElement {
  useCheckCookiesExpired();
  const { t } = useTranslation();

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Grid container sx={style.container} component="section">
            <Grid item lg={6} md={6} sm={12} xs={12} sx={style.aboutProject}>
              <Typography component="h1" variant="h3">
                {t('project_management_app')}
              </Typography>
              <Typography component="h2" variant="h5" sx={{ mb: '0.5rem', mt: '0.75rem' }}>
                {t('can_help_you')}
              </Typography>
              <Typography component="h2" variant="h5" sx={{ mb: '1rem' }}>
                {t('enjoy_working')}
              </Typography>
            </Grid>

            <Grid
              item
              component="img"
              lg={6}
              md={6}
              sm={12}
              xs={12}
              src={require('../img/kanban.jpg')}
              alt={t('kanban')}
              style={style.img}
            ></Grid>
          </Grid>

          <Grid container component="section">
            <Typography
              component="h2"
              variant="h2"
              flexGrow={1}
              textAlign="center"
              align="center"
              sx={{ m: 3 }}
            >
              {t('our_team')}
            </Typography>
            <Grid container spacing={4}>
              <Grid item lg={4} md={4} sm={6} xs={12} display="flex">
                <Card>
                  <CardMedia
                    component="img"
                    height="290"
                    src={require('../img/1.jpg')}
                    alt={t('photo')}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {t('Yulia')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {t('contribution_Yulia')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} display="flex">
                <Card>
                  <CardMedia
                    component="img"
                    height="290"
                    src={require('../img/2.jpg')}
                    alt={t('photo')}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {t('Sergey')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {t('contribution_Sergey')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} display="flex">
                <Card>
                  <CardMedia
                    component="img"
                    height="290"
                    src={require('../img/3.jpg')}
                    alt={t('photo')}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {t('Vera')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {t('contribution_Vera')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            flexDirection="column"
            sx={style.aboutCourse}
            component="section"
          >
            <Typography
              component="h2"
              variant="h2"
              display="flex"
              justifyContent="center"
              sx={{ mb: { xs: '0.75rem', md: '1rem' } }}
            >
              {t('about_the_React_course')}
            </Typography>
            <Typography component="p" variant="body1">
              {t('react_development')}&nbsp;
              <Link
                href="https://rs.school/react/"
                target="_blank"
                rel="noreferrer"
                underline="none"
              >
                {t('follow_the_link')}
              </Link>
            </Typography>
          </Grid>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default Welcome;
