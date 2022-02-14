import React, { useEffect, Fragment, lazy, Suspense, useState } from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
// import TableContainer from '@material-ui/core/TableContainer';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, useTheme } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
// import EditIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import AddAlarmIcon from '@material-ui/icons/AddAlarm';
// import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import axios from "axios";
import { formatDateYearFirst } from './utils/functions';
import Link from '@material-ui/core/Link';
//Redux
import { useDispatch, useSelector } from 'react-redux';

// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';
//Formik
import AssignmentIcon from '@material-ui/icons/Assignment';
const ButtonComponent = lazy(() => import('./components/ButtonComponent/ButtonComponent'));
const AddUserLogin = lazy(() => import('./AddUserLogin'));


const isLoading = false;


const useStyles = makeStyles((theme) => ({
  table: {
    maxHeight: 200,
  },

}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


const EmployeeList = () => {
  const typographyClasses = TypographyStyles();
  const spacingClasses = SpacingStyles();
  const buttonClasses = ButtonStyles();
  const classes = useStyles();
  const textFieldClasses = TextFieldStyles();
  const history = useHistory();
  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [openAddUserLogin, setNewAddUserLogin] = React.useState(false);
  const axios = require('axios');

  const userData1 = [{ Age: 27, BirthDate: "1994/07/23", EmployeeCode: "E-756982", FirstName: "Samuel", LastName: "Mana-ay" }]
  const [userData, setUserData] = useState({});
  const [userDataSelect, setUserDataUser] = useState({});
  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/searchEmp',
        {
          database: 'projectTrackerDB', table: 'employee_table1'
        })
      .then((response) => {
        setUserData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
  const openAddUserLoginMethod = (data) => {
  
    setSelectedDetails(data);
    setNewAddUserLogin(true);
  };

  return (
    <div>
      <Fragment>
        <Suspense fallback={<h3>Loading...</h3>}>

          <Grid container spacing={2} className={spacingClasses.marginBottom5}>
            <Grid item lg={8} md={7} sm={6} xs={12} className={spacingClasses.marginTop3} style={{ marginLeft: 15 }}>
              <Breadcrumbs>

                <Link color="inherit" onClick={() => history.push('/settings')}>
                  {'Settings'}
                </Link>
                <Typography variant="h5" className={classes.fontBold}>
                  {'Employee List'}
                </Typography>
              </Breadcrumbs>

            </Grid>
          </Grid>
          <ButtonComponent
            style={buttonClasses.buttonPrimary}
            color="primary"
            text={'Add'}
            function={(e) =>
            history.push('addNewEmployee')
 
            }
          />
          <Fragment>
            {isLoading ? (
              <LinearProgress />
            ) : userData && userData.length > 0 ? (
              <Grid container className={spacingClasses.marginBottom2}>
               
                <Grid item lg={12} md={12} xs={12}>
                  <Fragment>
                    <TableContainer component={Paper}>
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>Employee Code</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>last Name</TableCell>
                            <TableCell>Middle Name</TableCell>
                            <TableCell align={'center'}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userData.map((row) => (
                            <TableRow >
                              <TableCell>
                                {row.EmployeeCode}
                              </TableCell>
                              <TableCell>{row.FirstName}</TableCell>
                              <TableCell>{row.LastName}</TableCell>
                              <TableCell>{row.MiddleName}</TableCell>
                              <TableCell align='center'>
                                <ButtonComponent
                                  style={buttonClasses.buttonPrimary}
                                  icon={<EditIcon />}
                                  color="primary"
                                  text={'Edit'}
                                  function={(e) =>
                                    history.push({
                                      pathname: '/profile-edit',
                                      state: { id: row._id, location: 'EmployeeList' }
                                    })
                                  }
                                />{' '}
                                <ButtonComponent
                                  style={buttonClasses.buttonWarning}
                                  icon={<VisibilityIcon />}
                                  color="secondary"
                                  text={'View'}
                                  function={(e) =>
                                    // history.push('profile')
                                    history.push({
                                      pathname: '/profile',
                                      state: { id: row._id, location: 'EmployeeList' }
                                    })
                                  }
                                />
                                {' '}
                                <ButtonComponent
                                  style={buttonClasses.buttonWarning}
                                  icon={<GroupAddIcon />}

                                  text={'User Login'}
                                  style={clsx(buttonClasses.buttonPrimary)}
                                  function={() => openAddUserLoginMethod(row)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Fragment>
                  
                </Grid>
                <AddUserLogin
                  open={openAddUserLogin}
                  onAgree={() => setNewAddUserLogin(false)}
                  onDisagree={() => setNewAddUserLogin(false)}
                  details={selectedDetails}
                  returnval = {() => setNewAddUserLogin(false)}
                />
              </Grid>
            ) : (
              <Typography variant="h6">{'No Employees Available...'}</Typography>
            )}
          </Fragment>
        </Suspense>
      </Fragment>

    </div>
  );
};

export default EmployeeList;
