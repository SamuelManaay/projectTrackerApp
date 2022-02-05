import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    height: 56,
    width: 56,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
}));

const StatusCardComponent = ({ className, title, icon, iconBgColor, count, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h3">{count ? count : 0}</Typography>
          </Grid>
          <Grid item>
            <Avatar
              className={clsx(classes.avatar, {
                [classes[iconBgColor]]: iconBgColor,
              })}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

StatusCardComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.element,
  iconBgColor: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export default StatusCardComponent;
