import React, { Suspense, lazy, useEffect, useState } from 'react';
import HeaderDialog from './components/Dialogs/HeaderDialog';
import BodyDialog from './components/Dialogs/BodyDialog';
import FooterDialog from './components/Dialogs/FooterDialog';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import TextFieldComponent from './components/TextFieldComponent/TextFieldComponent';
import { useHistory, useLocation } from 'react-router-dom';
import axios from "axios";
// Material UI
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';

// import MenuItem from '@material-ui/core/MenuItem';
// Formik
import { Formik } from 'formik';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

// Utils


// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles } from './jss';
// import { Details } from '@material-ui/icons';

// Lazy Load
const ReusableDialog = lazy(() => import('./components/Dialogs/ConfirmationDialog'));
const SuccessDialog = lazy(() => import('./components/Dialogs/SuccessDialog'));

const AddorEditJobGrade = ({ open, details, onAgree, onDisagree }) => {
  console.log(details, "User Details here")
  // const dispatch = useDispatch();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();

  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [openConfDialog, setConfirmDialogOpen] = React.useState(false);
  const [openSucDialog, setSuccessDialogOpen] = React.useState(false);
  const theme = useTheme();
  const history = useHistory();
  const [deptValue, setdeptValue] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const db = 'projectTrackerDB';
  const tbl = 'employee_table1'
  const openConfirmDialog = (values) => {
    const details = {
      form: values,
      dialog: {
        title: 'Save',
        content: `Are you sure you want to add this new password?`,
        buttonDisagree: 'Cancel',
        buttonAgree: 'Save',
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
        content: `New Login has been created.`,
        buttonAgree: 'View details',
        type: 'primary',
      },
    };
    setSelectedDetails(arr);
    setSuccessDialogOpen(true);
  };


  const onAddEmployee = () => {
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
      <Suspense fallback={<h3>Loading...</h3>}>
        <ReusableDialog
          disableBackdropClick
          disableEscapeKeyDown
          details={selectedDetails?.dialog}
          open={openConfDialog}
          onAgree={onAddEmployee}
          onDisagree={() => setConfirmDialogOpen(false)}
          isLoading={false}
        />

        <SuccessDialog
          disableBackdropClick
          disableEscapeKeyDown
          details={selectedDetails?.dialog}
          open={openSucDialog}
          onAgree={() => {
            setSuccessDialogOpen(false);
            onAgree = false
          }}
          onDisagree={() => setSuccessDialogOpen(false)}
          isLoading={false}
        />
      </Suspense>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onDisagree}
        open={open}
        // TransitionComponent={SlideUp}
        fullWidth={true}
        maxWidth={'sm'}
        fullScreen={fullScreen}
      >
        <Formik
          initialValues={{
            _id: details?._id ? details?._id : '',
            EmployeeCode: details?.EmployeeCode ? details?.EmployeeCode : '',
          }}
          onSubmit={(values) => {
            openConfirmDialog(values);

          }}
        >
          {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderDialog onClose={onDisagree}>{'Add User Login'}</HeaderDialog>
              <BodyDialog dividers>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Username
                    </Typography>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      {values.EmployeeCode}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Password
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'password'}
                      name={'Password'}
                      value={values.password}
                      variant="outlined"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                </Grid>

              </BodyDialog>
              <FooterDialog>
                <ButtonComponent
                  fullWidth={true}
                  size="medium"
                  type="submit"
                  style={clsx(buttonClasses.buttonPrimary)}
                  text={'Save'}
                />
              </FooterDialog>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddorEditJobGrade;
