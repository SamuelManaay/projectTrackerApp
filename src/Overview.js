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
import { DataGrid } from '@material-ui/data-grid';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import TableFooter from '@material-ui/core/TableFooter';
// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';
//Formik
import AssignmentIcon from '@material-ui/icons/Assignment';
const ButtonComponent = lazy(() => import('./components/ButtonComponent/ButtonComponent'));
const DatePickerComponent = lazy(() => import('./components/DatepickerYearComponent/DatepickerYearComponent'));
const DropdownComponent = lazy(() => import('../src/components/DropdownComponent/DropdownComponent'));
const DeptDropdown = lazy(() => import('./DepartmentDropdown'));
const useStyles = makeStyles((theme) => ({
    // table: {
    //     "& .MuiTableCell-root": {
    //         borderLeft: "1px solid rgba(224, 224, 224, 1)"
    //     }
    // },
}));


const rows = [
    {
        id: 'E123456',
        EmpName: 'Sam',
        Department: 'HR',
        QOW: 5,
        Productivity: 5,
        JK: 4,
        CS: 8,
        TW: 3,
        SFTY: 2,
        RBLTY: 1,
        IA: 9,
        TS: 54,
        AS: '60%'

    },
    {
        id: 'E456789',
        EmpName: 'Samuel21',
        Department: 'IT',
        QOW: 5,
        Productivity: 5,
        JK: 4,
        CS: 8,
        TW: 3,
        SFTY: 2,
        RBLTY: 1,
        IA: 9,
    },
    {
        id: 'E456789',
        EmpName: 'Samuel23',
        Department: 'IT',
        QOW: 5,
        Productivity: 5,
        JK: 4,
        CS: 8,
        TW: 3,
        SFTY: 2,
        RBLTY: 1,
        IA: 9,
    },

];

const department = [
    { id: 1, Description: "HR" },
    { id: 2, Description: "IT" },
    { id: 3, Description: "HRALTH SERVICE" },
    { id: 4, Description: "SANITATION" }
];




const Overview = () => {
    const typographyClasses = TypographyStyles();
    const spacingClasses = SpacingStyles();
    const buttonClasses = ButtonStyles();
    const classes = useStyles();
    const textFieldClasses = TextFieldStyles();
    const history = useHistory();
    const isLoading = false;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return (
        <div>
            <Fragment>
                <Suspense fallback={<h3>Loading...</h3>}>
                    <Grid container spacing={2} className={spacingClasses.marginBottom2}>
                        <Grid item lg={8} md={7} sm={6} xs={12} style={{ margin: 10 }}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography variant="h4" color="textPrimary" className={typographyClasses.fontBold}>
                                    Overview
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: 5 }}>
                        <Grid item lg={3} md={6} sm={12} xs={12}>
                            <DropdownComponent datas={department} label={'Department'} variant={'outlined'} />
                        </Grid>
                        <Grid item lg={3} md={6} sm={12} xs={12}>
                            <DatePickerComponent label={'Year'} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} >
                        <Typography variant="h6" color="textPrimary" style={{ margin: 15 }} className={typographyClasses.font}>
                            Reported Date : {date}
                        </Typography>
                    </Grid>
                    <Grid style={{ margin: 15 }}>
                        <Fragment>
                            <TableContainer component={Paper} className={classes.table}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  >Emp Code</TableCell>
                                            <TableCell  >Emp name</TableCell>
                                            <TableCell  >Department</TableCell>
                                            <TableCell  >Quality of Work</TableCell>
                                            <TableCell  >Productivity</TableCell>
                                            <TableCell  >Job Knowledge</TableCell>
                                            <TableCell  >Client Service</TableCell>
                                            <TableCell  >Teamwork</TableCell>
                                            <TableCell  >Total Score</TableCell>
                                            <TableCell  >Average Score</TableCell>
                                            <TableCell align={'center'}>View</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow >
                                                <TableCell  >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell  >{row.EmpName}</TableCell>
                                                <TableCell  >{row.Department}</TableCell>
                                                <TableCell  >{row.QOW}</TableCell>
                                                <TableCell  >{row.Productivity}</TableCell>
                                                <TableCell  >{row.JK}</TableCell>
                                                <TableCell   >{row.CS}</TableCell>
                                                <TableCell  >{row.TW}</TableCell>
                                                <TableCell  >{row.TS}</TableCell>
                                                <TableCell  >{row.AS}</TableCell>
                                                <TableCell  >
                                                    <ButtonComponent
                                                        style={buttonClasses.buttonPrimary}
                                                        icon={<VisibilityIcon />}
                                                        fullWidth
                                                        text={'View'}
                                                        function={(e) =>
                                                            history.push('individualview')
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Fragment>
                    </Grid>
                </Suspense>
            </Fragment>

        </div>
    );
};

export default Overview;
