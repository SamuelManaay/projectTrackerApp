import React from 'react';
import HeaderDialog from '../components/Dialogs/HeaderDialog';
import BodyDialog from '../components/Dialogs/BodyDialog';
import TextFieldComponent from '../components/TextFieldComponent/TextFieldComponent';

// Material UI
// import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

// Utils
import { SlideUp } from '../utils/animations';

// const useStyles = makeStyles(() => ({
//   icon: {
//     height: 32,
//     width: 32,
//   },
// }));

const DialogFormNormal = ({ open, onAgree, onDisagree }) => {
  // const classes = useStyles();

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onDisagree}
        open={open}
        TransitionComponent={SlideUp}
        fullWidth={true}
        maxWidth={'md'}
      >
        <HeaderDialog onClose={onDisagree}>Sample Form</HeaderDialog>

        <BodyDialog dividers>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent
                multiline={true}
                rows={5}
                size={'small'}
                type={'text'}
                label={'Employee Code'}
                name={'EmployeeCode'}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextFieldComponent
                multiline={true}
                rows={5}
                size={'small'}
                type={'text'}
                label={'Employee Code'}
                name={'EmployeeCode'}
              />
            </Grid>
          </Grid>
        </BodyDialog>
      </Dialog>
    </div>
  );
};

export default DialogFormNormal;
