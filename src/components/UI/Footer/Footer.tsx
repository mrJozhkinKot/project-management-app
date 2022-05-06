import React from 'react';
import { Grid, Link, SvgIcon, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactComponent as RSSIcon } from '../../img/rs_school_js.svg';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <Grid className="footer-container" container lg={12}>
        <Grid item lg={4} sm={3} xs={12}>
          <Link
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <SvgIcon component={RSSIcon} inheritViewBox className="footer-logo" />
          </Link>
        </Grid>
        <Grid container item lg={4} sm={6} xs={12} p={1.25}>
          <Grid item className="footer-link-wrapper">
            <Link
              className="footer-link"
              href="https://github.com/mrjozhkinkot"
              target="_blank"
              rel="noreferrer"
              underline="none"
              color="inherit"
            >
              <Typography component="span">
                <GitHubIcon fontSize="small" />
                Yulia
              </Typography>
            </Link>
          </Grid>
          <Grid item component="span" className="footer-link-wrapper">
            <Link
              className="footer-link"
              href="https://github.com/insane-idea"
              target="_blank"
              rel="noreferrer"
              underline="none"
              color="inherit"
            >
              <Typography component="span">
                <GitHubIcon fontSize="small" />
                Sergey
              </Typography>
            </Link>
          </Grid>
          <Grid item component="span" className="footer-link-wrapper">
            <Link
              className="footer-link"
              href="https://github.com/veru44ia"
              target="_blank"
              rel="noreferrer"
              underline="none"
              color="inherit"
            >
              <Typography component="span">
                <GitHubIcon fontSize="small" />
                Vera
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item lg={4} sm={3} xs={12}>
          <Typography component="span">© 2022</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
