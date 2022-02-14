import React, { useState, Suspense, lazy, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useHistory, useLocation } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
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
import { SpacingStyles, TypographyStyles, TextFieldStyles, ButtonStyles } from './jss';
import { formatDate, formatDateYearFirst } from './utils/functions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from "axios";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextFieldComponent from './components/TextFieldComponent/TextFieldComponent';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.divider,
    marginBottom: theme.spacing(3)
  },
}));
const ButtonComponent = lazy(() => import('./components/ButtonComponent/ButtonComponent'));
const ReusableDialog = lazy(() => import('./components/Dialogs/ConfirmationDialog'));
const SuccessDialog = lazy(() => import('./components/Dialogs/SuccessDialog'));



export default function Profile() {
  const location = useLocation();
  const EMPID = location.state.id;
  const Loc = location.state.location;
  const classes = useStyles();
  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [openConfDialog, setConfirmDialogOpen] = React.useState(false);
  const [openSucDialog, setSuccessDialogOpen] = React.useState(false);
  const buttonClasses = ButtonStyles();
  const textFieldClasses = TextFieldStyles();
  const typographyClasses = TypographyStyles();
  const spacingClasses = SpacingStyles();
  const [file, setFile] = useState(null);
  const db = 'projectTrackerDB';
  const tbl = 'employee_table1'
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const genders = ["Male", "Female"]
  const civilStatuses = ["Single", "Married", "Widdowed"]
  const religions = [
    'N/A',
    'Aglipayan',
    'Agnostic',
    'Anglican',
    'Assemblies of God',
    'Athiest',
    'Baptist',
    'Born Again Christian',
    'Buddhism',
    'Christian',
    'Church of God',
    'Members of the Church of God International',
    'El Shaddai',
    'Hinduism',
    'Iglesia Ni Cristo (Inc)',
    'Islam (Muslim)',
    'Jehovas Witness (Jw)',
    'Jesus is Lord',
    'Judaism',
    'Kingdom of Jesus Christ',
    'Lord of the Nation',
    'New Apostolic',
    'Others',
    'Protestant',
    'Roman Catholic (Rc)',
    'Seventh Day Adventist (Sda)',
    'Sikh',
    'Taoism',
    'The Church of Jesus Christ of Latter-Day Saints',
    'United Pentecostal',
  ];
  const bloodTypes = ['UNKNOWN', 'A', 'A+', 'A-', 'B', 'B+', 'B-', 'O', 'O+', 'O-', 'AB', 'AB+', 'AB-'];

  useEffect(() => {
    setIsLoading(true)
    axios
      .post('http://127.0.0.1:5000/searchEmpID',
        {
          database: db, table: tbl, empID: EMPID
        })
      .then((response) => {
        setUserData(response.data);
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const openConfirmDialog = (values) => {
    const details = {
      form: values,
      dialog: {
        title: 'Update',
        content: `Are you sure you want to update employee details?`,
        buttonDisagree: 'Cancel',
        buttonAgree: 'Update',
        type: 'primary',
      },
    };

    setSelectedDetails(details);
    setConfirmDialogOpen(true);
  };

  const openSuccessDialog = () => {
    const arr = {
      dialog: {
        title: 'Success',
        content: `Employee details has been updated.`,
        buttonAgree: 'View details',
        type: 'primary',
      },
    };
    setSelectedDetails(arr);
    setSuccessDialogOpen(true);
  };

  const onUpdateEmployee = () => {
    let { form } = selectedDetails;
    setConfirmDialogOpen(false);
    console.log(form, "form here")
    axios
      .post('http://127.0.0.1:5000/operate_req',
        {
          database: db, table: tbl, operationTarget: [form], operation: 31
        })
      .then((response) => {
        openSuccessDialog();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <Breadcrumbs style={{ marginLeft: 15 }}>
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
        onSubmit={(values) => {

          const newValues = {
            ...values
          };
          openConfirmDialog(newValues);
        }}
      // validationSchema={personalInformationSchema}
      >
        {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <Suspense fallback={<h3>Loading...</h3>}>
                <ReusableDialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  details={selectedDetails?.dialog}
                  open={openConfDialog}
                  onAgree={onUpdateEmployee}
                  onDisagree={() => setConfirmDialogOpen(false)}
                  isLoading={false}
                />

                <SuccessDialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  details={selectedDetails?.dialog}
                  open={openSucDialog}
                  onAgree={() => {
                    history.push(`/employees`);
                  }}
                  onDisagree={() => setSuccessDialogOpen(false)}
                  isLoading={false}
                />
              </Suspense>
              <CardContent className={textFieldClasses.textFieldSection}>


                <Typography
                  variant="h5"
                  className={clsx(
                    typographyClasses.fontBold,
                    spacingClasses.marginBottom5,
                    spacingClasses.marginTop2
                  )}
                >
                  Basic Information
                </Typography>
                <Grid container spacing={2} className={clsx(
                    spacingClasses.marginTop5
                  )}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Employee Code
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Employee Code'}
                      name={'DatacenterCode'}
                      value={values.EmployeeCode}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Last Name
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Last Name'}
                      name={'Lastname'}
                      value={values.LastName}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      First Name
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'First Name'}
                      name={'Firstname'}
                      variant="outlined"
                      size="small"
                      value={values.FirstName}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Middle Name
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Middle Name'}
                      name={'Middlename'}
                      variant="outlined"
                      size="small"
                      value={values.MiddleName}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={3} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Suffix
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Suffix'}
                      variant="outlined"
                      name={'Suffix'}
                      size="small"
                      value={values.Suffix}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item lg={3} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Extension Name
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Extension Name'}
                      variant="outlined"
                      name={'ExtensionName'}
                      size="small"
                      value={values.ExtensionName}
   
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Birthdate
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        placeholder={'Birthdate'}
                        size="small"

                        autoOk
                        fullWidth
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        value={values.Birthdate}
                        onChange={(val) => {
                          setFieldValue('Birthdate', val);
                        }}
                        variant="outlined"
                        maxDate={new Date()}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Gender
                    </Typography>
                    <TextField
                      placeholder={'Gender'}
                      variant="outlined"
                      select
                      size="small"
                      value={values.Gender}

                      onChange={handleChange('Gender')}
                      fullWidth
                    >
                      {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Civil Status
                    </Typography>
                    <TextField
                      placeholder={'Civil Status'}
                      variant="outlined"
                      select
                      size="small"
                      value={values.CivilStatus}

                      onChange={handleChange('CivilStatus')}
                      fullWidth
                    >
                      {civilStatuses.map((status, index) => (
                        <MenuItem key={index} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
               

                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Blood Type
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder={'Blood Type'}
                      select
                      size="small"
                      value={values.BloodType}

                      onChange={handleChange('BloodType')}
                      fullWidth
                    >
                      {bloodTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Address
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Address'}
                      name={'Address'}
                      value={values.Address}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
                <Typography
                  variant="h5"
                  className={clsx(
                    typographyClasses.fontBold,
                    spacingClasses.marginBottom2,
                    spacingClasses.marginTop5
                  )}
                >
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Telephone No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Telephone No.'}
                      name={'TelephoneNo'}
                      variant="outlined"
                      size="small"
                      value={values.TelephoneNo}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Mobile No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Mobile No.'}
                      name={'MobileNo'}
                      variant="outlined"
                      size="small"
                      value={values.MobileNo}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Personal Email
                    </Typography>
                    <TextFieldComponent
                      type={'email'}
                      placeholder={'Personal Email.'}
                      name={'PersonalEmail'}
                      value={values.EmailAddress1}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Company Email
                    </Typography>
                    <TextFieldComponent
                      type={'email'}
                      placeholder={'Company Email'}
                      name={'CompanyEmail'}
                      variant="outlined"
                      size="small"
                      value={values.EmailAddress2}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                </Grid>

               
                <Typography
                  variant="h5"
                  className={clsx(
                    typographyClasses.fontBold,
                    spacingClasses.marginBottom2,
                    spacingClasses.marginTop5
                  )}
                >
                  Emergency Contacts
                </Typography>

                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Name
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Name'}
                      name={'EmergencyName'}
                      value={values.EmergencyName}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Relationship
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Relationship'}
                      name={'EmergencyRelationship'}
                      value={values.EmergencyRelationship}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Mobile No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Mobile No.'}
                      name={'EmergencyMobileNo'}
                      variant="outlined"
                      size="small"
                      value={values.EmergencyMobileNo}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Address
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Address'}
                      name={'EmergencyAddress'}
                      value={values.EmergencyAddress}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                </Grid>

                <Typography
                  variant="h5"
                  className={clsx(
                    typographyClasses.fontBold,
                    spacingClasses.marginBottom2,
                    spacingClasses.marginTop5
                  )}
                >
                  Other Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      SSS No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'SSS No.'}
                      name={'SSSNo'}
                      value={values.SSSNo}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Pag-IBIG No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      placeholder={'Pag-IBIG No.'}
                      name={'PagibigNo'}
                      value={values.PagibigNo}
                      variant="outlined"
                      size="small"

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>


                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      TIN No.
                    </Typography>
                    <TextFieldComponent
                      type={'text'}
                      name={'TINNo'}
                      placeholder={'TIN No.'}
                      variant="outlined"
                      size="small"
                      value={values.TINNo}

                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      No. of Dependents
                    </Typography>
                    <TextFieldComponent
                      type={'number'}
                      placeholder={'No. of Dependents'}
                      name={'NoOfDependent'}
                      variant="outlined"
                      size="small"
                      value={values.NoOfDependent}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>

    
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                    >
                      <Button
                        style={{ marginBottom: 150 }}
                        variant={'contained'}
                        type="submit"
                        size={'medium'}
                        color={'primary'}
                      >
                        {'Update'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* <Card>
              <Suspense fallback={<h3>Loading...</h3>}>
                <ReusableDialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  details={selectedDetails?.dialog}
                  open={openConfDialog}
                  onAgree={onUpdateEmployee}
                  onDisagree={() => setConfirmDialogOpen(false)}
                  isLoading={false}
                />

                <SuccessDialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  details={selectedDetails?.dialog}
                  open={openSucDialog}
                  onAgree={() => {
                    history.push(`/employees`);
                  }}
                  onDisagree={() => setSuccessDialogOpen(false)}
                  isLoading={false}
                />
              </Suspense>
              {isLoading ? (
                <LinearProgress />
              ) : userData.length > 0 ? (
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
                      <Typography
                        variant="body1"
                        className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                      >
                        Employee Code
                      </Typography>
                      <TextFieldComponent
                        type={'text'}
                        placeholder={'Employee Code'}
                        name={'EmployeeCode'}
                        value={values.EmployeeCode}
                        variant="outlined"
                        size="small"

                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Last Name
                          </Typography>
                          <TextFieldComponent
                            type={'text'}
                            placeholder={'Last Name'}
                            name={'Lastname'}
                            value={values.LastName}
                            variant="outlined"
                            size="small"

                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            First Name
                          </Typography>
                          <TextFieldComponent
                            type={'text'}
                            placeholder={'First Name'}
                            name={'Firstname'}
                            variant="outlined"
                            size="small"
                            value={values.FirstName}

                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Middle Name
                          </Typography>
                          <TextFieldComponent
                            type={'text'}
                            placeholder={'Middle Name'}
                            name={'Middlename'}
                            variant="outlined"
                            size="small"
                            value={values.MiddleName}

                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Suffix
                          </Typography>
                          <TextFieldComponent
                            type={'text'}
                            placeholder={'Suffix'}
                            variant="outlined"
                            name={'Suffix'}
                            size="small"
                            value={values.Suffix}

                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Extension Name
                          </Typography>
                          <TextFieldComponent
                            type={'text'}
                            placeholder={'Extension Name'}
                            variant="outlined"
                            name={'ExtensionName'}
                            size="small"
                            value={values.ExtensionName}

                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Birthdate
                          </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              placeholder={'Birthdate'}
                              size="small"

                              autoOk
                              fullWidth
                              format="MM/dd/yyyy"
                              inputVariant="outlined"
                              value={values.Birthdate}
                              onChange={(val) => {
                                setFieldValue('Birthdate', val);
                              }}
                              variant="outlined"
                              maxDate={new Date()}
                            />
                          </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Gender
                          </Typography>
                          <TextField
                            placeholder={'Gender'}
                            variant="outlined"
                            select
                            size="small"
                            value={values.Gender}

                            onChange={handleChange('Gender')}
                            fullWidth
                            style={{marginBottom:100}}
                          >
                            {genders.map((gender, index) => (
                              <MenuItem key={index} value={gender}>
                                {gender}
                              </MenuItem>
                            ))}
                          </TextField>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                    <Typography
                            variant="body1"
                            className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                          >
                            Civil Status
                          </Typography>
                          <TextField
                            placeholder={'Civil Status'}
                            variant="outlined"
                            select
                            size="small"
                            value={values.CivilStatus}

                            onChange={handleChange('CivilStatus')}
                            fullWidth
                          >
                            {civilStatuses.map((status, index) => (
                              <MenuItem key={index} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </TextField>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <List>
                        <ListItem>
                          <ListItemText primary="Religion" secondary={values.Religion} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <List>
                        <ListItem>
                          <ListItemText primary="Nationality" secondary={values.Nationality} />
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

                </CardContent>

              ) : (
                <Typography variant="h6">No Employee</Typography>
              )}
              <Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ marginTop: '2%', marginLeft: 15, marginRight: 10 }}
                >
                  <Button
                    style={{ marginBottom: 150 }}
                    variant={'contained'}
                    type="submit"
                    size={'medium'}
                    color={'primary'}
                  >
                    {'Update'}
                  </Button>

                </Grid>
              </Grid>

            </Card> */}

          </form>
        )}
      </Formik>
    </div>

  );
}