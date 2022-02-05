import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSuccess: {
    color: theme.palette.success.main,
  },
  colorInfo: {
    color: theme.palette.info.main,
  },
  colorError: {
    color: theme.palette.error.main,
  },
  colorSecondaryLight: {
    color: theme.palette.secondary.light,
  },
  backgroundColorPrimaryLight: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.white,
  },
  backgroundColorWarningLight: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.white,
  },
  backgroundColorSuccessLight: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.white,
  },
  backgroundColorErrorLight: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.white,
  },
  backgroundColorDivider: {
    backgroundColor: theme.palette.divider,
    color: theme.palette.black,
  },
  colorTableHead: {
    color: theme.palette.info.main,
    fontWeight: 'bold',
  },
  colorWhite: {
    color: theme.palette.white,
  },
}));
