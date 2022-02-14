
import React from "react";
import './Settings.css'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { SpacingStyles, TypographyStyles, TextFieldStyles, ButtonStyles } from './jss';
import List from '@material-ui/core/List';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Typography from '@mui/material/Typography';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { margin } from "@mui/system";
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Banner from 'react-js-banner';
const useStyles = makeStyles((theme) => ({
  icons: {
    '& svg': {
      fontSize: 80
    }
  },
  text: {
        alignItems: 'center',
        justifyContent: 'center',

  }
}));






const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();
  
  function Navigate(e) {
    if (e === "EmployeeList") history.push('employees');
    else if (e === "Competencies") history.push('competencies');
    else if (e === "GeneralSettings") history.push('generalsettings');
    else if (e === "Home") history.push('dashboard');
  }

  return (
<div className={spacingClasses.marginTop3} style={{margin:15}}>
<Grid container spacing={2} className={spacingClasses.marginBottom5}>
            <Grid item lg={8} md={7} sm={6} xs={12} className={spacingClasses.marginTop3} style={{ marginLeft: 15 }}>
            <Breadcrumbs>

         <Link color="inherit" onClick={() => history.push('/dashboard')}>
         {'Dashboard'}
       </Link>
        <Typography variant="h5" className={classes.fontBold}>
          {'Settings'}
        </Typography>
      </Breadcrumbs>

            </Grid>
          </Grid>
    <div class="row">
    {/* <div class="column">
        <IconButton className={classes.icons} onClick={() => {Navigate("Home") }}>
          <HomeIcon />
        </IconButton>
        <Typography id="Home" className={classes.text} style={{marginLeft:30}}>Home</Typography>
      </div> */}
      <div class="column">
        <IconButton className={classes.icons} onClick={() => {Navigate("EmployeeList") }}>
          <AccountBoxIcon />
        </IconButton>
        <Typography id="EmployeeList" className={classes.text}>Employee List</Typography>
      </div>
      <div class="column">
        <IconButton className={classes.icons} onClick={() => {Navigate("Competencies") }}>
          <ListIcon />
        </IconButton>
        <Typography id="Competencies" className={classes.text}>Competencies</Typography>
      </div>
      <div class="column">
        <IconButton className={classes.icons} onClick={() => {Navigate("GeneralSettings") }}>
          <SettingsApplicationsIcon />
        </IconButton>
        <Typography id="GeneralSettings" className={classes.text}>General Settings</Typography>
      </div>
    </div>
</div>
  );
};

export default Settings;