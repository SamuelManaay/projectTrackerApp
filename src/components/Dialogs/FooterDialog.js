import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const FooterDialog = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogActions className={classes.root} {...other}>
      {children}
    </MuiDialogActions>
  );
});

export default FooterDialog;
