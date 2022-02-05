import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Formik } from 'formik';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { SpacingStyles, TypographyStyles, TextFieldStyles, ButtonStyles } from './jss';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';

const useStyles = makeStyles((theme) => ({
    divider: {
        background: theme.palette.divider,
        marginBottom: theme.spacing(3)
    },
}));



export default function Profile() {
    const classes = useStyles();
    const textFieldClasses = TextFieldStyles();
    const typographyClasses = TypographyStyles();
    const spacingClasses = SpacingStyles();
    const [file, setFile] = useState(null);
    const history = useHistory();
    const buttonClasses = ButtonStyles();

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    // Basic Information
                    CompanyName: 'Sample Company',
                    RatingSystem: '10 - point Rating',
                    StartingYear: 2015,
                    RTPA: 'Employee',
                    PAPO: 'Department',
                    SEB: 'Surname - Name - Department',
                    SENA: 'Surname Name',
                    SEI: 'Yes',
                }}
                onSubmit={(values) => { }}
            // validationSchema={personalInformationSchema}
            >
                {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <div>
                        <Divider classes={{ root: classes.divider }} />
                        <Typography
                        style={{ marginLeft: 10 }}
                            variant="h5"
                            className={clsx(
                                typographyClasses.fontBold,
                                spacingClasses.marginBottom2,
                                spacingClasses.marginTop1
                            )}
                        >
                            General Settings
                        </Typography>

                        <Grid container className={spacingClasses.marginBottom2}>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Company name" secondary={values.CompanyName} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Rating System" secondary={values.RatingSystem} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Starting Year" secondary={values.StartingYear} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Refer to people as" secondary={values.RTPA} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="People are part of" secondary={values.PAPO} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Sort Employees by" secondary={values.SEB} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Show employee name as" secondary={values.SENA} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Show employee ID" secondary={values.SEI} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid container className={spacingClasses.marginTop5} style={{ marginLeft: 10 }}>
                            <ButtonComponent
                                style={buttonClasses.buttonWarning}
                                icon={<EditIcon />}
                                color="primary"
                                text={'Edit'}
                                function={(e) =>
                                    history.push('generalsettingsedit')
                                  }
                            />
                        </Grid>
                        </Grid>
                    </div>
                )}
            </Formik>
        </div>

    );
}