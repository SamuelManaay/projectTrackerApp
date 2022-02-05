import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
});

const BodyDialog = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogContent className={classes.root} {...other}>
      {children}
    </MuiDialogContent>
  );
});

export default BodyDialog;
