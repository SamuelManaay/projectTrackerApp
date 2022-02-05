import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

// JSS
import { TextFieldStyles } from '../../jss';

const TextFieldComponent = (props) => {
  const textFieldClasses = TextFieldStyles();
  return (
    <TextField
     
      {...props}
      disabled={true}
      size="small"
      // className={textFieldClasses.datepicker}
      inputProps={{ style: { cursor: 'pointer' } }}
    />
  );
};

const DatePickerComponent = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [dtopen, setDtOpen] = useState(false);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        helperText={null}
        autoOk
        fullWidth
        inputVariant="outlined"
        value={selectedDate}
        views={['year']}
        onChange={handleDateChange}
        format="yyyy"
        TextFieldComponent={TextFieldComponent}
        animateYearScrolling
        onClick={() => setDtOpen(!dtopen)}
        open={dtopen}
        onClose={() => setDtOpen(false)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
