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
import Checkbox from '@material-ui/core/Checkbox';
// import { Rating } from 'react-simple-star-rating'
import { DataGrid } from '@material-ui/data-grid';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import VisibilityIcon from '@material-ui/icons/Visibility';
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Rating from "@mui/material/Rating";
import List from '@material-ui/core/List';
import { Formik } from 'formik';


import Divider from '@material-ui/core/Divider';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import TableFooter from '@material-ui/core/TableFooter';
// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';
//Formik
import AssignmentIcon from '@material-ui/icons/Assignment';
import { formatDate, formatDateYearFirst } from './utils/functions';
const DatePickerComponent = lazy(() => import('./components/DatepickerYearComponent/DatepickerYearComponent'));
const DropdownComponent = lazy(() => import('./components/DropdownComponent/DropdownComponent'));
const useStyles = makeStyles((theme) => ({
    // table: {
    //     "& .MuiTableCell-root": {
    //         borderLeft: "1px solid rgba(224, 224, 224, 1)"
    //     }
    // },
}));

const rows = {
        id: 'E123456',
        EmpName: 'Samuel Mana-ay',
        Department: 6,
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

    };

const Competencies = [
    { id: 1, Description: "Quality of Work", Score: 5, Comment: "N/A" },
    { id: 2, Description: "Productivity", Score: 4, Comment: "N/A" },
    { id: 3, Description: "Job Knowledge", Score: 6, Comment: "N/A" },
    { id: 4, Description: "Client Service", Score: 4, Comment: "N/A" },
    { id: 5, Description: "Teamwork", Score: 7, Comment: "N/A" }
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
    const [rating, setRating] = useState(0) // initial rating value


    return (
        <div>

            <Formik
                enableReinitialize
                initialValues={{
                    // Basic Information
                    EmployeeCode: rows.id,
                    Fullname: rows.EmpName,
                    EmployeeComment: 'this is employee Comment dummy',
                    QOW: 5,
                    Productivity: 6,
                    JK: 4,
                    CS: 6,
                    TWRK: 6,
                    PrevAgreedAction: 'this is prev agreed actions',
                    ActionsAgreed: 'this is actions agreed'

                }}
                onSubmit={(values) => { }}
            // validationSchema={personalInformationSchema}
            >
                {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <Card>

                        <CardContent className={textFieldClasses.textFieldSection}>
                            <Typography
                                variant="h5"
                                className={clsx(
                                    typographyClasses.fontBold,
                                    spacingClasses.marginBottom2,
                                    spacingClasses.marginTop1
                                )}
                            >
                                Individual View
                            </Typography>

                            <Grid container className={spacingClasses.marginBottom2}>
                            <Grid item lg={4} md={4} xs={4}>
                                    <List>
                                        <ListItemText primary="Employee Code" secondary={values.EmployeeCode} />
                                    </List>
                                </Grid>
                                <Grid item lg={4} md={4} xs={4}>
                                    <List>
                                        <ListItemText primary="Full Name" secondary={values.Fullname} />
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginBottom2}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <List>
                                        <ListItemText primary="Employee Comment" />
                                    </List>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        variant="outlined"
                                        multiline={true}
                                        rows={3}
                                        defaultValue={values.EmployeeComment}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginBottom2}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <Fragment>
                                        <TableContainer component={Paper} className={classes.table}>
                                            <Table stickyHeader>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell  >Competencies</TableCell>
                                                        <TableCell align='center' >Score</TableCell>
                                                        <TableCell align={'center'} style={{ width: '60%' }}>Comment</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Competencies.map((row) => (
                                                        <TableRow >
                                                            <TableCell  >
                                                                {row.Description}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                            <Rating name="disabled" value={row.Score} max={10} disabled />
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.Comment}
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Fragment>
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginBottom2}>
                            <Grid item lg={4} md={4} xs={4}>
                                    <List>
                                        <ListItemText primary="Total Score" secondary={40} />
                                    </List>
                                </Grid>
                                <Grid item lg={4} md={4} xs={4}>
                                    <List>
                                        <ListItemText primary="Average Score Score" secondary={4.88} />
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginBottom2}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <List>
                                        <ListItemText primary="Previously agreed action" />
                                    </List>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        variant="outlined"
                                        multiline={true}
                                        rows={3}
                                        defaultValue={values.PrevAgreedAction}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginBottom2}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <List>
                                        <ListItemText primary="Actions agreed during this review" />
                                    </List>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        variant="outlined"
                                        multiline={true}
                                        rows={3}
                                        defaultValue={values.ActionsAgreed}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Formik>
        </div >
    );
};

export default Overview;
