import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Formik } from 'formik';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import { SpacingStyles, TypographyStyles, TextFieldStyles } from './jss';
import { formatDate, formatDateYearFirst } from './utils/functions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
  const location = useLocation();
  const EMPID = location.state.id;
  const Loc = location.state.location;


  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/searchEmpID',
        {
          database: 'projectTrackerDB', table: 'employee_table1', empID: EMPID
        })
      .then((response) => {
        setUserData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (

    <div>
      <Breadcrumbs>
        {Loc === 'EmployeeList' ? (
          <Link color="inherit" onClick={() => history.push('/employees')}>
            {'Employee List'}
          </Link>
        ) : (
          <Link color="inherit" onClick={() => history.push('/dashboard')}>
            {'Dashboard'}
          </Link>
        )}
        <Typography variant="h5" className={classes.fontBold}>
          {'Profile'}
        </Typography>
      </Breadcrumbs>

      <Formik
        enableReinitialize

        initialValues={{
          // Basic Information
          _id: userData[0]?._id ? userData[0]?._id : '',
          EmployeeCode: userData[0]?.EmployeeCode ? userData[0]?.EmployeeCode : '',
          LastName: userData[0]?.LastName ? userData[0]?.LastName : '',
          FirstName: userData[0]?.FirstName ? userData[0]?.FirstName : '',
          MiddleName: userData[0]?.MiddleName ? userData[0]?.MiddleName : '',
          Suffix: userData[0]?.Suffix ? userData[0]?.Suffix : '',
          Gender: userData[0]?.Gender ? userData[0]?.Gender : '',
          CivilStatus: userData[0]?.CivilStatus ? userData[0]?.CivilStatus : '',
          Birthdate: userData[0]?.Birthdate ? userData[0]?.Birthdate : '',
          Birthplace: userData[0]?.Birthplace ? userData[0]?.Birthplace : '',
          ExtensionName: userData[0]?.ExtensionName ? userData[0]?.ExtensionName : '',
          Religion: userData[0]?.Religion ? userData[0]?.Religion : '',
          BloodType: userData[0]?.BloodType ? userData[0]?.BloodType : '',
          // Contact Information
          MobileNo: userData[0]?.MobileNo ? userData[0]?.MobileNo : '',
          TelephoneNo: userData[0]?.TelephoneNo ? userData[0]?.TelephoneNo : '',
          EmailAddress1: userData[0]?.PersonalEmail ? userData[0]?.PersonalEmail : '',
          EmailAddress2: userData[0]?.CompanyEmail ? userData[0]?.CompanyEmail : '',
          EmergencyName: userData[0]?.EmergencyName ? userData[0]?.EmergencyName : '',
          EmergencyRelationship: userData[0]?.EmergencyRelationship ? userData[0]?.EmergencyRelationship: '',
          EmergencyMobileNo: userData[0]?.EmergencyMobileNo ? userData[0]?.EmergencyMobileNo : '',
          Address: userData[0]?.Address ? userData[0]?.Address : '',
          EmergencyAddress: userData[0]?.EmergencyAddress ? userData[0]?.EmergencyAddress : '',
          SSSNo: userData[0]?.SSSNo ? userData[0]?.SSSNo  : '',
          TINNo: userData[0]?.TINNo ? userData[0]?.TINNo : '',
          PagibigNo: userData[0]?.PagibigNo ? userData[0]?.PagibigNo : '',
          NoOfDependent: userData[0]?.NoOfDependent ? userData[0]?.NoOfDependent : '',

        }}
        onSubmit={(values) => { }}
      // validationSchema={personalInformationSchema}
      >
        {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Card>

            <CardContent className={textFieldClasses.textFieldSection}>

              <Divider classes={{ root: classes.divider }} />

              <Typography
                variant="h5"
                className={clsx(
                  typographyClasses.fontBold,
                  spacingClasses.marginBottom2,
                  spacingClasses.marginTop1
                )}
              >
                Basic Information
              </Typography>

              <Grid container className={spacingClasses.marginBottom2}>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Employee Code" secondary={values.EmployeeCode} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Last Name" secondary={values.LastName} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="First Name" secondary={values.FirstName} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Middle Name" secondary={values.MiddleName} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Suffix" secondary={values.Suffix} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Extension Name" secondary={values.ExtensionName} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Birthdate" secondary={values.Birthdate} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Gender" secondary={values.Gender} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Civil Status" secondary={values.CivilStatus} />
                    </ListItem>
                  </List>
                </Grid>
          
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Blood Type" secondary={values.BloodType} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>




              <Divider classes={{ root: classes.divider }} />

              <Typography
                variant="h5"
                className={clsx(
                  typographyClasses.fontBold,
                  spacingClasses.marginBottom2,
                )}
              >
                Contact Information
              </Typography>
              <Grid container className={spacingClasses.marginBottom2}>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Telephone No." secondary={values.TelephoneNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Mobile No." secondary={values.MobileNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Personal Email" secondary={values.EmailAddress1} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Company Email" secondary={values.EmailAddress2} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>


              <Divider classes={{ root: classes.divider }} />

              <Typography
                variant="h5"
                className={clsx(
                  typographyClasses.fontBold,
                  spacingClasses.marginBottom2,
                )}
              >
                Emergency Contacts
              </Typography>
              <Grid container className={spacingClasses.marginBottom2}>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary={values.EmergencyName} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Relationship" secondary={values.EmergencyRelationship} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Mobile No." secondary={values.EmergencyMobileNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Address" secondary={values.EmergencyAddress} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Divider classes={{ root: classes.divider }} />

              <Typography
                variant="h5"
                className={clsx(
                  typographyClasses.fontBold,
                  spacingClasses.marginBottom2,
                )}
              >
                Other Information
              </Typography>
              <Grid container className={spacingClasses.marginBottom2}>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="SSS No." secondary={values.SSSNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Pag-IBIG No." secondary={values.PagibigNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Tin No." secondary={values.TINNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary="No. of Dependents" secondary={values.NoOfDependent} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>     

            </CardContent>
          </Card>
        )}
      </Formik>

    </div>

  );
}