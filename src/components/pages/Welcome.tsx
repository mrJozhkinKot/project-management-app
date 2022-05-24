import { Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment } from 'react';
import { useCheckCookiesExpired } from '../../hooks/authorization';

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

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Grid container sx={style.container} component="section">
            <Grid item lg={6} md={6} sm={12} xs={12} sx={style.aboutProject}>
              <Typography component="h1" variant="h2">
                Project management app
              </Typography>
              <Typography component="h2" variant="h4" sx={{ mb: '0.5rem', mt: '0.75rem' }}>
                Can help you to manage your projects effectively
              </Typography>
              <Typography component="h2" variant="h4" sx={{ mb: '1rem' }}>
                Create new boards, columns, tasks, drag and drop it and enjoy working productively
                watching progress visually
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
              alt="kanban"
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
              Our team
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={6} xs={12} display="flex">
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    src="https://images.unsplash.com/photo-1598015132635-131afe3ba07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                    alt="photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Yulia
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Team lead. Developed architecture, design, main page, boards, tasks...
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
                    alt="photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Sergey
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Implemented backend deployment, user authorization and edit profile...
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
                    alt="photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Vera
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Implemented header, welcome page, footer, application localization.
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
              Аbout the React course at RS School
            </Typography>
            <Typography component="p" variant="body1">
              &quot;React Development&quot; is a free online course from The Rolling Scopes
              community. Everyone can study at RS School, regardless of age, professional employment
              or location. For more information or to register for the course, please&nbsp;
              <Link
                href="https://rs.school/react/"
                target="_blank"
                rel="noreferrer"
                underline="none"
              >
                follow the link.
              </Link>
            </Typography>
          </Grid>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default Welcome;
