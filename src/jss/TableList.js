import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  root2: {
    width: '100%',
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
  },
  container: {
    maxHeight: 500,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStatus: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  linkStatus: {
    padding: theme.spacing(0.8),
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: 600,
    borderRadius: 5,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  buttonAdd: {
    textDecoration: 'none',
  },
  iconButton: {
    padding: 10,
  },
}));
