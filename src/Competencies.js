import React, { useEffect, Fragment, lazy, Suspense, useState } from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Formik } from 'formik';
import { ButtonStyles, TypographyStyles, SpacingStyles, TableListStyles, TextFieldStyles } from './jss';

const Competencies = [
    { id: 1, Description: "Quality of Work" },
    { id: 2, Description: "Productivity" },
    { id: 3, Description: "Job Knowledge" },
    { id: 4, Description: "Client Service" },
    { id: 5, Description: "Teamwork" }
];

const Overview = () => {
    const typographyClasses = TypographyStyles();
    const spacingClasses = SpacingStyles();
    const buttonClasses = ButtonStyles();
    return (
        <div>
            <Grid style={{marginLeft:10}}>
                <Typography
                    variant="h5"
                    className={clsx(
                        typographyClasses.fontBold,
                        spacingClasses.marginBottom2,
                        spacingClasses.marginTop1
                    )}
                >
                    Competencies
                </Typography>
                <Grid container className={spacingClasses.marginBottom2} style={{marginLeft:10}}>
                <ButtonComponent
                    style={buttonClasses.buttonWarning}
                    icon={<AddIcon />}
                    color="primary"
                    text={'Add'}
                // function={() => openAddorEditjobGradeMethod(true, jobGrade)}
                />
                </Grid>
                <Grid container className={spacingClasses.marginBottom2}>
                    <Grid item lg={12} md={12} xs={12}>
                        <Fragment>
                            <TableContainer component={Paper}>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '80%' }}>Description</TableCell>
                                            <TableCell align='center'>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Competencies.map((row) => (
                                            <TableRow >
                                                <TableCell style={{ width: '80%' }} >
                                                    {row.Description}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <ButtonComponent
                                                        style={buttonClasses.buttonPrimary}
                                                        icon={<EditIcon />}
                                                        color="primary"
                                                        text={'Edit'}
                                                    // function={() => openAddorEditjobGradeMethod(true, jobGrade)}
                                                    />{' '}
                                                    <ButtonComponent
                                                        style={buttonClasses.buttonWarning}
                                                        icon={<DeleteIcon />}
                                                        color="secondary"
                                                        text={'Delete'}
                                                    // function={() => openAddorEditjobGradeMethod(true, jobGrade)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Fragment>
                    </Grid>
                </Grid>
            </Grid>

        </div >
    );
};

export default Overview;
