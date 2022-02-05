import React from 'react';

// Material UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    height: 56,
    width: 56,
    marginBottom: theme.spacing(1),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bgColor: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const CardComponent = ({ className, title, icon, iconBgColor, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <div className={classes.center}>
              <Avatar className={clsx(classes.avatar, classes.bgColor)}>{icon}</Avatar>
            </div>
            <div className={classes.center}>
              <Typography
                className={clsx(classes.title, classes.center)}
                color="textSecondary"
                gutterBottom
                variant="h4"
              >
                {title}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
