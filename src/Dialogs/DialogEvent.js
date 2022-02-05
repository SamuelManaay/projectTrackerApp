import React, { useEffect, useState } from 'react';
import HeaderDialog from '../components/Dialogs/HeaderDialog';
import BodyDialog from '../components/Dialogs/BodyDialog';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Hidden } from '@material-ui/core';

// Formik
import { Formik } from 'formik';

// Redux
import { useDispatch } from 'react-redux';

// Utils
import { SlideUp } from '../utils/animations';

// Date-FNS
import DateFnsUtils from '@date-io/date-fns';

const DialogEvent = ({ open, details, onAgree, onDisagree, isView }) => {
  useEffect(() => {
    if (details != null) {
      console.log(details);
      setEventName(details.eventName);
      setEventType(details.eventTypeID);
      setVenue(details.venue);
      setDescription(details.description);
      setStartDate(new Date(details.startDate).toLocaleDateString());
      setStartTime(new Date(details.startDate + ' ' + details.startTime).toUTCString());
      setEndDate(new Date(details.endDate).toLocaleDateString());
      setEndTime(new Date(details.endDate + ' ' + details.endTime).toUTCString());

      if (isView) {
        setTitleBar('Add Event');
      } else {
        setTitleBar('View Event');
      }
      console.log(open);
      console.log(1);
    }
  }, [details, open, isView]);
  console.log(2);

  const [titleBar, setTitleBar] = React.useState('');
  const dispatch = useDispatch();

  const [eventName, setEventName] = React.useState('');
  const [eventType, setEventType] = React.useState('');
  const [venue, setVenue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const handleTextFieldEventChangeEventName = (data) => {
    setEventName(data);
  };

  const handleChangeEventType = (data) => {
    // console.log(data,99);
    setEventType(data.target.value);
  };

  const handleTextFieldEventVenue = (data) => {
    setVenue(data);
  };

  const handleChangeEventStartDate = (data) => {
    setStartDate(data);
  };

  const handleChangeEventStartTime = (data) => {
    setStartTime(data);
  };

  const handleChangeEventEndDate = (data) => {
    setEndDate(data);
  };

  const handleChangeEventEndTime = (data) => {
    setEndTime(data);
  };

  const ActionButton_Save = (values) => {
    alert('save goes here');
    // console.log(values, 'Values');
    //Do Saving transaction here
    // console.log(
    //   'Sub: ' +
    //     subdept +
    //     '\n' +
    //     'Pos: ' +
    //     pstn +
    //     '\n' +
    //     'SDte: ' +
    //     startDate +
    //     '\n' +
    //     'EDte: ' +
    //     endDate +
    //     '\n' +
    //     'DpHP: ' +
    //     isDeptHead +
    //     '\n' +
    //     'JobDe: ' +
    //     jobDescription
    // );
  };
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [dtopenStart, setDtOpenStart] = useState(false);
  const [dtopenEnd, setDtOpenEnd] = useState(false);
  // const handleCloseAnnouncementDate = () => {
  //   setDtOpen(false);
  //   console.log(postedDate, 122);
  // };
  // const handleDate
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
        <Hidden mdDown>
          <HeaderDialog onClose={onDisagree}>{titleBar}</HeaderDialog>
          <BodyDialog dividers>
            <Formik
              onSubmit={(values) => {
                dispatch(ActionButton_Save());
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid container spacing={1}>
                        <Grid item lg={6} md={6} xs={6} sm={6}>
                          <TextField
                            label="Event Name"
                            value={eventName}
                            onChange={handleTextFieldEventChangeEventName}
                            variant="outlined"
                            fullWidth={true}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} xs={6} sm={6}>
                          <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel>Event Type</InputLabel>
                            <Select
                              label="Event Type"
                              fullWidth={true}
                              value={eventType}
                              onChange={handleChangeEventType}
                            >
                              <MenuItem value="et1">Event Type Description Settings 1</MenuItem>
                              <MenuItem value="et2">Event Type Description Settings 2</MenuItem>
                              <MenuItem value="et3">Event Type 3</MenuItem>
                              <MenuItem value="et4">Event Type 4</MenuItem>
                              <MenuItem value="et5">Event Type 5</MenuItem>
                              <MenuItem value="et6">Event Type 6</MenuItem>
                              <MenuItem value="et7">Event Type 7</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12} spacing={1}>
                      <TextField
                        label="Venue"
                        value={venue}
                        onChange={handleTextFieldEventVenue}
                        variant="outlined"
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12} spacing={1}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={10}
                        value={description}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid item container lg={12} md={12} xs={12} sm={12} spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid item lg={6} md={6} xs={6} sm={6}>
                            <KeyboardDatePicker
                              autoOk
                              fullWidth={true}
                              inputVariant="outlined"
                              label="Start Event Date"
                              value={startDate}
                              onChange={handleChangeEventStartDate}
                              format="MMM dd, yyyy"
                              onClick={() => setDtOpenStart(!dtopenStart)}
                              open={dtopenStart}
                              onClose={() => setDtOpenStart(false)}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} xs={6} sm={6}>
                            <KeyboardTimePicker
                              id="time-picker"
                              label="Start Event Time"
                              inputVariant="outlined"
                              value={startTime}
                              onChange={handleChangeEventStartTime}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid item container lg={12} md={12} xs={12} sm={12} spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid item lg={6} md={6} xs={6} sm={6}>
                            <KeyboardDatePicker
                              autoOk
                              fullWidth={true}
                              inputVariant="outlined"
                              label="End Event Date"
                              value={endDate}
                              onChange={handleChangeEventEndDate}
                              format="MMM dd, yyyy"
                              onClick={() => setDtOpenEnd(!dtopenEnd)}
                              open={dtopenEnd}
                              onClose={() => setDtOpenEnd(false)}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} xs={6} sm={6}>
                            <KeyboardTimePicker
                              id="time-picker"
                              label="End Event Time"
                              inputVariant="outlined"
                              value={endTime}
                              onChange={handleChangeEventEndTime}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Grid container item lg={12} md={12} xs={12} style={{ marginTop: 10 }}>
                      <Grid container item lg={12} md={12} xs={12} style={{ marginTop: 10 }}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={2}>
                          {/* <Button onClick={handleClose} variant="outlined">
                          Cancel
                        </Button> */}
                          &nbsp;
                        </Grid>
                        <Grid item xs={3}>
                          {/* <ButtonComponent
                          function={ActionButton_Save}
                          fullWidth={true}
                          icon={<SaveIcon />}
                          style={clsx(buttonClasses.buttonPrimary)}
                          text={'Save'}
                        /> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </BodyDialog>
        </Hidden>
        {/* Mobile View */}
        <Hidden lgUp>
          <HeaderDialog onClose={onDisagree}>{titleBar}</HeaderDialog>
          <BodyDialog dividers>
            <Formik
              onSubmit={(values) => {
                dispatch(ActionButton_Save());
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12} sm={12}>
                          <TextField
                            label="Event Name"
                            value={eventName}
                            onChange={handleTextFieldEventChangeEventName}
                            variant="outlined"
                            fullWidth={true}
                          />
                        </Grid>
                        <Grid item lg={12} md={12} xs={12} sm={12}>
                          <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel>Event Type</InputLabel>
                            <Select
                              label="Event Type"
                              fullWidth={true}
                              value={eventType}
                              onChange={handleChangeEventType}
                            >
                              <MenuItem value="et1">Event Type Description Settings 1</MenuItem>
                              <MenuItem value="et2">Event Type Description Settings 2</MenuItem>
                              <MenuItem value="et3">Event Type 3</MenuItem>
                              <MenuItem value="et4">Event Type 4</MenuItem>
                              <MenuItem value="et5">Event Type 5</MenuItem>
                              <MenuItem value="et6">Event Type 6</MenuItem>
                              <MenuItem value="et7">Event Type 7</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12} spacing={1}>
                      <TextField
                        label="Venue"
                        value={venue}
                        onChange={handleTextFieldEventVenue}
                        variant="outlined"
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12} spacing={1}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={10}
                        value={description}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid item lg={12} md={12} xs={12} sm={12}>
                            <KeyboardDatePicker
                              autoOk
                              fullWidth={true}
                              inputVariant="outlined"
                              label="Start Event Date"
                              value={startDate}
                              onChange={handleChangeEventStartDate}
                              format="MMM dd, yyyy"
                              onClick={() => setDtOpenStart(!dtopenStart)}
                              open={dtopenStart}
                              onClose={() => setDtOpenStart(false)}
                            />
                          </Grid>
                          <Grid item lg={12} md={12} xs={12} sm={12}>
                            <KeyboardTimePicker
                              id="time-picker"
                              label="Start Event Time"
                              inputVariant="outlined"
                              value={startTime}
                              onChange={handleChangeEventStartTime}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid item lg={12} md={12} xs={12} sm={12}>
                            <KeyboardDatePicker
                              autoOk
                              fullWidth={true}
                              inputVariant="outlined"
                              label="End Event Date"
                              value={endDate}
                              onChange={handleChangeEventEndDate}
                              format="MMM dd, yyyy"
                              onClick={() => setDtOpenEnd(!dtopenEnd)}
                              open={dtopenEnd}
                              onClose={() => setDtOpenEnd(false)}
                            />
                          </Grid>
                          <Grid item lg={12} md={12} xs={12} sm={12}>
                            <KeyboardTimePicker
                              id="time-picker"
                              label="End Event Time"
                              inputVariant="outlined"
                              value={endTime}
                              onChange={handleChangeEventEndTime}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Grid container item lg={12} md={12} xs={12} style={{ marginTop: 10 }}>
                      <Grid container item lg={12} md={12} xs={12} style={{ marginTop: 10 }}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={2}>
                          {/* <Button onClick={handleClose} variant="outlined">
                          Cancel
                        </Button> */}
                          &nbsp;
                        </Grid>
                        <Grid item xs={3}>
                          {/* <ButtonComponent
                          function={ActionButton_Save}
                          fullWidth={true}
                          icon={<SaveIcon />}
                          style={clsx(buttonClasses.buttonPrimary)}
                          text={'Save'}
                        /> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </BodyDialog>
        </Hidden>
      </Dialog>
    </div>
  );
};

export default DialogEvent;
