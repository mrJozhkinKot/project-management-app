import { Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment } from 'react';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

theme.typography.h2 = {
  fontSize: '2.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.75rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

const style = {
  container: {
    marginTop: '2.75rem',
    marginBottom: '1rem',
  },
  aboutProject: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '1.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  img: {
    display: 'flex',
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
              <Typography component="h1" variant="h2">
                {t('project_management_app')}
              </Typography>
              <Typography component="h2" variant="h4" sx={{ mb: '0.5rem', mt: '0.75rem' }}>
                {t('can_help_you')}
              </Typography>
              <Typography component="h2" variant="h4" sx={{ mb: '1rem' }}>
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
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={6} xs={12} display="flex">
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    src="https://images.unsplash.com/photo-1598015132635-131afe3ba07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
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
                    height="300"
                    src="https://images.unsplash.com/photo-1598015132635-131afe3ba07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
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
                    height="300"
                    src="https://images.unsplash.com/photo-1598015132635-131afe3ba07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
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
            sx={{ p: 4 }}
            component="section"
          >
            <Typography
              component="h2"
              variant="h2"
              display="flex"
              justifyContent="center"
              sx={{ mb: 2.5 }}
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
