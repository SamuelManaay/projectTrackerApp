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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// import AddAlarmIcon from '@material-ui/icons/AddAlarm';
// import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import { formatDateYearFirst } from './utils/functions';

//Redux
import { useDispatch, useSelector } from 'react-redux';

// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';
//Formik
import AssignmentIcon from '@material-ui/icons/Assignment';
const ButtonComponent = lazy(() => import('./components/ButtonComponent/ButtonComponent'));


const useStyles = makeStyles((theme) => ({
  table: {
    maxHeight: 200,
  },
  // content: {
  //   paddingTop: theme.spacing(1),
  //   textAlign: 'left',
  //   overflowX: 'auto',
  //   '& table': {
  //     marginBottom: 0,
  //   },
  // },
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
  return (
    <div>
      <Fragment>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Grid container spacing={2} className={spacingClasses.marginBottom5}>
            <Grid item lg={8} md={7} sm={6} xs={12} className={spacingClasses.marginTop3} style={{marginLeft:15}}>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h5" color="textPrimary" className={typographyClasses.fontBold}>
                  Employee List
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>

          <Fragment>
            <Hidden mdDown>
              <TableContainer component={Paper} className={classes.table}>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee Code</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>last Name</TableCell>
                        <TableCell>Middle Name</TableCell>
                        <TableCell>Birthdate</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align={'center'}>Action</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow >
                          <TableCell>
                            E-756982
                          </TableCell>
                          <TableCell>Samuel</TableCell>
                          <TableCell>Mana-ay</TableCell>
                          <TableCell>Abelondon</TableCell>
                          <TableCell>1994/07/23</TableCell>
                          <TableCell>27</TableCell>
                          <TableCell>Single</TableCell>

                            <TableCell align={'center'}>
                              <div >
                              <ButtonComponent
                                  style={buttonClasses.buttonSecondary}
                                  icon={<EditIcon />}
                                  text={'Edit'}
                                  color="primary"
                                  fullWidth
                                  function={(e) =>
                                    history.push('profile-edit')
                                  }
                                  />
                              </div>
                              <br></br>
                                <div>
                                <ButtonComponent
                                  style={buttonClasses.buttonPrimary}
                                  icon={<VisibilityIcon />}
                                  fullWidth
                                  color="secondary"
                                  text={'View'}
                                  function={(e) =>
                                    history.push('profile')
                                  }
                                />
                                </div>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
              </TableContainer>
            </Hidden>

            <Hidden lgUp>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={6} xs={12} >
                      <Card className={classes.card}>
                        <CardContent className={classes.content}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell variant="head">Employee Code</TableCell>
                                <TableCell variant="body">E-756982</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">First Name</TableCell>
                                <TableCell variant="body">Samuel</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">Last Name</TableCell>
                                <TableCell variant="body">Mana-ay</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">Middle Name</TableCell>
                                <TableCell variant="body">Abelondon</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">Birthdate</TableCell>
                                <TableCell variant="body">1994/07/23</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">Age</TableCell>
                                <TableCell variant="body">27</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell variant="head">Status</TableCell>
                                <TableCell variant="body">Single</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                            <ButtonComponent
                              fullWidth={true}
                              style={clsx(buttonClasses.buttonSecondary, spacingClasses.marginTop3)}
                              icon={<EditIcon />}
                              text={'Edit'}
                            />
                            <ButtonComponent
                              fullWidth={true}
                              style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginTop1)}
                              function={(e) =>
                                history.push(`profile`)
                              }
                              icon={<VisibilityIcon />}
                              text={'View'}
                            />
                        </CardContent>
                      </Card>
                    </Grid>
                </Grid>
            </Hidden>
          </Fragment>
        </Suspense>
      </Fragment>

    </div>
  );
};

export default EmployeeList;
