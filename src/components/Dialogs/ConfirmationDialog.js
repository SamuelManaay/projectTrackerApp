import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
};

const useStyles = makeStyles((theme) => ({
  titleError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white,
    '&:hover, &:focus': {
      background: theme.palette.error.dark,
    },
  },
  titleSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.white,
    '&:hover, &:focus': {
      background: theme.palette.success.dark,
    },
  },
  titleWarning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.white,
    '&:hover, &:focus': {
      background: theme.palette.warning.dark,
    },
  },
  titlePrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    '&:hover, &:focus': {
      background: theme.palette.primary.dark,
    },
  },
  title: {
    ...centerStyles,
    lineHeight: 1.5,
    fontWeight: 'bold',
    fontSize: theme.typography.h2.fontSize,
    textAlign: 'center',
  },
  msg: {
    ...centerStyles,
    fontSize: theme.typography.h6.fontSize,
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  footer: {
    ...centerStyles,
    marginBottom: 20,
    marginTop: theme.spacing(0.5),
  },
  fontBold: {
    fontWeight: 'bold',
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ style, details, open, onAgree, onDisagree }) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        style={{ zIndex: style?.zIndex ? style?.zIndex : 1400 }}
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onDisagree}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div>
          <DialogContent>
            <div className={classes.title}>{details?.title}</div>
            <div className={classes.msg}>
              <div>{details?.content}</div>
            </div>

            {/* Schedule Appointment */}
            {details?.Date && details?.StartTime && details?.EndTime ? (
              <Grid container spacing={1} className={classes.mt2}>
                <Grid item md={6} xs={6} className={classes.fontBold}>
                  Date
                </Grid>
                <Grid item md={6} xs={6}>
                  {details?.Date}
                </Grid>

                <Grid item md={6} xs={6} className={classes.fontBold}>
                  Timeslot
                </Grid>
                <Grid item md={6} xs={6}>
                  {details?.StartTime} - {details?.EndTime}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
            {/* Schedule Appointment */}

            {/* Cancel Appointment */}
            {details?.Code && details?.ScheduleDate && details?.ScheduleTime ? (
              <Grid container spacing={1} className={classes.mt2}>
                <Grid item md={6} xs={6} className={classes.fontBold}>
                  Transaction Code
                </Grid>
                <Grid item md={6} xs={6}>
                  {details?.Code}
                </Grid>

                <Grid item md={6} xs={6} className={classes.fontBold}>
                  Schedule Date
                </Grid>
                <Grid item md={6} xs={6}>
                  {details?.ScheduleDate}
                </Grid>

                <Grid item md={6} xs={6} className={classes.fontBold}>
                  Schedule Time
                </Grid>
                <Grid item md={6} xs={6}>
                  {details?.ScheduleTime}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
            {/* Cancel Appointment */}
          </DialogContent>
          <DialogActions className={classes.footer}>
            <Button variant="outlined" onClick={onDisagree}>
              {details?.buttonDisagree}
            </Button>
            <Button
              variant="contained"
              className={
                details?.type === 'error'
                  ? classes.titleError
                  : details?.type === 'success'
                  ? classes.titleSuccess
                  : details?.type === 'warning'
                  ? classes.titleWarning
                  : classes.titlePrimary
              }
              onClick={onAgree}
            >
              {details?.buttonAgree}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
