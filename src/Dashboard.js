
import React from "react";
import './Dashboard.css'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';

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

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const spacingClasses = SpacingStyles();
  function Navigate(e) {
    if (e === "Project") history.push('project');
    else if (e === "Profile")  history.push({
      pathname: '/profile',
      state: {location: 'Dashboard' }
  });
    else if (e === "Settings") history.push('settings');
    else if (e === "Users") history.push('users');
    else if (e === "EmployeeList") history.push('employees');
    else if (e === "Overview") history.push('overview');
    else if (e === "Competencies") history.push('competencies');
    else if (e === "GeneralSettings") history.push('generalsettings');
    else if (e === "Chart") history.push('charts');
  }

  return (
    <div className={spacingClasses.marginTop3} style={{margin:15}}>
      <Typography variant="h5" >
        Dashboard
      </Typography>
      <div class="row">
        <div class="column">
          <IconButton className={classes.icons} onClick={() => { Navigate("Settings") }}>
            <SettingsIcon />
          </IconButton>
          <Typography id="Settings" className={classes.text} style={{marginLeft:22}}>Settings</Typography>
        </div>
        <div class="column">
          <IconButton className={classes.icons} onClick={() => { Navigate("Profile") }}>
            <AccountCircleIcon />
          </IconButton>
          <Typography id="Profile" className={classes.text} style={{marginLeft:30}}>Profile</Typography>
        </div>

        <div class="column">
          <IconButton className={classes.icons} onClick={() => { Navigate("Overview") }}>
            <SupervisedUserCircleIcon />
          </IconButton>
          <Typography id="Overview" className={classes.text} style={{marginLeft:20}}>Overview</Typography>
        </div>
        {/* <div class="column">
          <IconButton className={classes.icons} onClick={() => { Navigate("Chart") }}>
            <BarChartIcon />
          </IconButton>
          <Typography id="Chart" className={classes.text} style={{marginLeft:30}}>Chart</Typography>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;