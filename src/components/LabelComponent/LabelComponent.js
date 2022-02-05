import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    borderRadius: 2,
    display: 'inline-flex',
    flexGrow: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
    height: 20,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    textTransform: 'uppercase',
    padding: '4px 8px',
  },
  warning: {
    color: theme.palette.warning.main,
    backgroundColor: fade(theme.palette.warning.main, 0.08),
  },
  success: {
    color: theme.palette.success.main,
    backgroundColor: fade(theme.palette.success.main, 0.08),
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: fade(theme.palette.error.main, 0.08),
  },
  info: {
    color: theme.palette.info.main,
    backgroundColor: fade(theme.palette.info.main, 0.08),
  },
}));

function Label({ className, color, children, style, ...rest }) {
  const classes = useStyles();

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes[color]]: color,
        },
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export default Label;
