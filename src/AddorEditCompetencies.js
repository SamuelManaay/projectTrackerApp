import React, { Suspense, lazy, useEffect, useState } from 'react';
import HeaderDialog from './components/Dialogs/HeaderDialog';
import BodyDialog from './components/Dialogs/BodyDialog';
import FooterDialog from './components/Dialogs/FooterDialog';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import TextFieldComponent from './components/TextFieldComponent/TextFieldComponent';

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
// import { addJobGradeschema } from 'utils/validations'
// import MenuItem from '@material-ui/core/MenuItem';
// Formik
import { Formik } from 'formik';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// import { addJobGrade, editJobGrade} from 'actions';

// Utils
// import { SlideUp } from 'utils/animations';

// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles } from './jss';
// import { Details } from '@material-ui/icons';

// Lazy Load
const ReusableDialog = lazy(() => import('./components/Dialogs/ConfirmationDialog'));
const SuccessDialog = lazy(() => import('./components/Dialogs/SuccessDialog'));

const AddorEditCompetencies = ({ open, details, onAgree, onDisagree, isEdit }) => {
  console.log(details)
  const dispatch = useDispatch();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();
  const isSubmitting = useSelector((state) => state.jobgrade.isSubmitting);
  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [openConfDialog, setConfirmDialogOpen] = React.useState(false);
  const [openSucDialog, setSuccessDialogOpen] = React.useState(false);
  const theme = useTheme();
  // const [deptValue, setdeptValue] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const CompleteName = useSelector((state) => state.auth.infos?.DataCenterName);
  

  const openConfirmDialog = (values) => {
   
    const arr = {
      ...{
        ...values,
      
        title: isEdit ? 'Update' : 'Create',
        content: isEdit
          ? `Are you sure you want to update job grade details?`
          : `Are you sure you want to create this job grade?`,
        buttonDisagree: 'Cancel',
        buttonAgree: isEdit ? 'Update' : 'Create',
        type: 'primary',
      },
    };
    setSelectedDetails(arr);
    setConfirmDialogOpen(true);
  };

//   const onConfirm = () => {
//     isEdit ? onEditJobGrade() : onAddJobGrade();
//   };

//   const onAddJobGrade = () => {
//     let { buttonAgree, buttonDisagree, title, type, content, ...newValues } = selectedDetails;
//     setConfirmDialogOpen(false);

//     dispatch(addJobGrade({ ...newValues, CreatedBy: CompleteName }))
//       .then(() => {
       
//         onAgree();
//         openSuccessDialog();
//       })
//       .catch((err) => { console.log(err)});
//   };

//   const onEditJobGrade = () => {
//     let { buttonAgree, buttonDisagree, title, type, content, ...newValues } = selectedDetails;
//     setConfirmDialogOpen(false);

//     dispatch(editJobGrade({ ...newValues, UpdatedBy: CompleteName  }))
//       .then(() => {
        
//         onAgree();
//         openSuccessDialog();
//       })
//       .catch(() => { });
//   };

  const openSuccessDialog = () => {
    const arr = {
      ...{
        title: 'Success',
        content: isEdit ? `Job Grade details has been updated.` : `Job Grade has been created.`,
        buttonAgree: 'Ok',
        type: 'primary',
      },
    };

    setSelectedDetails(arr);
    setSuccessDialogOpen(true);
  };

  return (
    <div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <ReusableDialog
          disableBackdropClick
          disableEscapeKeyDown
          details={selectedDetails}
          open={openConfDialog}
        //   onAgree={onConfirm}
          onDisagree={() => setConfirmDialogOpen(false)}
          isLoading={false}
        />
        <SuccessDialog
          disableBackdropClick
          disableEscapeKeyDown
          details={selectedDetails}
          open={openSucDialog}
          onAgree={() => {
            setSuccessDialogOpen(false);
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
            JobGradeID: details?.JobGradeID ? details?.JobGradeID : '',
            Description: details?.Description ? details?.Description : '',
            JobGrade: details?.JobGrade ? details?.JobGrade : '',
            Remarks: details?.Remarks ? details?.Remarks : '',
            SalaryAmountFrom: details?.SalaryAmountFrom ? details?.SalaryAmountFrom : '',
            SalaryAmountTo: details?.SalaryAmountTo ? details?.SalaryAmountTo : '',
            isActive: details?.isActive ? details?.isActive :  isEdit? false: true,
            isComboDefault: details?.isComboDefault ? details?.isComboDefault : false
          }}
          onSubmit={(values) => {
            openConfirmDialog(values);
           
          }}
        >
          {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderDialog onClose={onDisagree}>{isEdit ? 'Edit Job Grade' : 'Add New Job Grade'}</HeaderDialog>
              <BodyDialog dividers>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Description
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'text'}
                      rows={5}
                      multiline={true}
                      // placeholder={'Description'}
                      name={'Description'}
                      value={values.Description}
                      variant="outlined"
                      helperText={touched.Description ? errors.Description : ''}
                      error={touched.Description && Boolean(errors.Description)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Job Grade
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'text'}
                      // placeholder={'Salary Amount From'}
                      name={'JobGrade'}
                      value={values.JobGrade}
                      variant="outlined"
                      helperText={touched.JobGrade ? errors.JobGrade : ''}
                      error={touched.JobGrade && Boolean(errors.JobGrade)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Remarks
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'text'}
                      rows={5}
                      multiline={true}
                      // placeholder={'Description'}
                      name={'Remarks'}
                      value={values.Remarks}
                      variant="outlined"
                      helperText={touched.Remarks ? errors.Remarks : ''}
                      error={touched.Remarks && Boolean(errors.Remarks)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Salary Amount From
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'number'}
                      // placeholder={'Salary Amount From'}
                      name={'SalaryAmountFrom'}
                      value={values.SalaryAmountFrom}
                      variant="outlined"
                      helperText={touched.SalaryAmountFrom ? errors.SalaryAmountFrom : ''}
                      error={touched.SalaryAmountFrom && Boolean(errors.SalaryAmountFrom)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Typography
                      variant="body1"
                      className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom1)}
                    >
                      Salary Amount To
                    </Typography>
                    <TextFieldComponent
                      size="small"
                      type={'number'}
                      // placeholder={'Salary Amount To'}
                      name={'SalaryAmountTo'}
                      value={values.SalaryAmountTo}
                      variant="outlined"
                      helperText={touched.SalaryAmountTo ? errors.SalaryAmountTo : ''}
                      error={touched.SalaryAmountTo && Boolean(errors.SalaryAmountTo)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12} sm={12}>
                    <Grid
                      container
                      direction="row"
                    >
                          <Grid item>
                        <FormControlLabel
                          control={<Checkbox
                            checked={values.isActive}
                            // disabled = {isEdit? false:true}
                            onChange={(e, value) => {
                              setFieldValue('isActive', value);
                            }}
                            name="Active"
                            color="primary"
                          />}
                          label="Active"
                          labelPlacement="end"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={<Checkbox
                            checked={values.isComboDefault}
                            onChange={(e, value) => {
                              setFieldValue('isComboDefault', value);
                            }}
                            name="isComboDefault"
                            color="primary"
                          />}
                          label="Default"
                          labelPlacement="end"
                        />
                      </Grid>
                      </Grid>
                      </Grid>
              
                </Grid>
              </BodyDialog>
              <FooterDialog>
                <ButtonComponent
                  fullWidth={true}
                  size="medium"
                  type="submit"
                  style={clsx(buttonClasses.buttonPrimary)}
                  text={isSubmitting ? <CircularProgress color="inherit" /> : isEdit ? 'Update' : 'Save'}
                />
              </FooterDialog>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddorEditCompetencies;
