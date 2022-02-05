import React, { useEffect, useState } from 'react';
import HeaderDialog from '../components/Dialogs/HeaderDialog';
import BodyDialog from '../components/Dialogs/BodyDialog';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { TypographyStyles, SpacingStyles } from '../jss';

import { formatTime } from '../utils/functions';

import clsx from 'clsx';

// Utils
import { SlideUp } from '../utils/animations';

const DialogAnnouncement = ({ open, details, onAgree, onDisagree, isView }) => {
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
        <HeaderDialog onClose={onDisagree}>News</HeaderDialog>
        <BodyDialog dividers>
          <Card>
            <CardContent>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Typography
                    variant="h4"
                    className={clsx(
                      typographyClasses.fontBold,
                      spacingClasses.marginTop1,
                      spacingClasses.marginBottom2
                    )}
                  >
                    {details.Subject}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" className={spacingClasses.marginBottom3}>
                <Typography variant="h6">
                  {date} | {time}
                </Typography>
              </Grid>
              <hr></hr>
              <Grid container spacing={2} className={clsx(spacingClasses.marginTop3, spacingClasses.marginBottom3)}>
                <Typography variant="body1" className={clsx(spacingClasses.marginLeft2)}>
                  {details.Details}
                </Typography>
              </Grid>
              <hr></hr>
              <Grid container spacing={2} className={clsx(spacingClasses.marginTop3, spacingClasses.marginBottom1)}>
                <Typography variant="h6" className={clsx(spacingClasses.marginLeft2)}>
                  Posted By: <strong>{details.CreatedBy}</strong>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </BodyDialog>
      </Dialog>
    </div>
  );
};

export default DialogAnnouncement;
