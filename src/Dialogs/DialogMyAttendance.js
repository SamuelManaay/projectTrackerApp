import React, { useEffect, useState } from 'react';
import HeaderDialog from '../../../../../components/Dialogs/HeaderDialog';
import BodyDialog from '../../../../../components/Dialogs/BodyDialog';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

import { TypographyStyles, SpacingStyles, ButtonStyles } from '../../../../../jss';

import { formatTime } from 'utils/functions';

// Utils
import { SlideUp } from 'utils/animations';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const DialogMyAttendance = ({ open, details, onAgree, onDisagree, isView }) => {
  const classes = useStyles();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    splitDate();
  });

  const splitDate = () => {
    var newDate = new Date(details.StartDateTime);
    var year = newDate.getFullYear();
    var month = newDate.getMonth();
    var day = newDate.getDate();
    var time = formatTime(newDate);

    setDate(year + ' -' + month + '-' + day);
    setTime(time);
  };

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
        <HeaderDialog onClose={onDisagree}></HeaderDialog>
        <BodyDialog dividers></BodyDialog>
      </Dialog>
    </div>
  );
};

export default DialogMyAttendance;
