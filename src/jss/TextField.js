import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  textFieldSection: {
    padding: theme.spacing(3),
  },

  // DatePicker
  datepicker: {
    cursor: 'pointer',
    '& .MuiInputBase-root.Mui-disabled': {
      color: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
    },
  },
  // DatePicker

  // SearchBar
  searchBarSection: {
    height: 35,
    width: '100%',
    display: 'flex',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    border: `1px solid transparent`,
  },
  searchBarFocused: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    margin: 4,
    marginRight: 5,
  },
  // SearchBar
}));
