import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  buttonPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonPrimaryWithMargin: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonSuccessWithMargin: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonSuccessWithMarginRight: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    marginLeftRight: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonSecondaryWithMargin: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonInfo: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  buttonInfoWithMargin: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  buttonWarning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  buttonWarningWithMargin: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  buttonError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonErrorWithMargin: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    marginLeft: theme.spacing(0.8),
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonWhite: {
    backgroundColor: theme.palette.white,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.white,
    },
  },
  buttonTextFieldWide: {
    width: '100%',
    height: '48px',
    textTransform: 'none',
  },
}));
