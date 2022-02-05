import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  fontBold: {
    fontWeight: 'bold',
  },
}));

const BreadcrumbComponent = ({ baseTitle, baseRoute, code, name, pageTitle, id }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.marginBottom}>
      <Breadcrumbs>
        <Link color="inherit" onClick={() => history.push(baseRoute)}>
          {baseTitle}
        </Link>
        {code ? (
          <Typography variant="h5" className={classes.fontBold}>
            {code}
          </Typography>
        ) : (
          ''
        )}
        {name ? (
          <Typography variant="h5" className={classes.fontBold}>
            <Link color="inherit" onClick={() => history.push('/project-management/dashboard/' + id)}>
              {name}
            </Link>
          </Typography>
        ) : (
          ''
        )}
        <Typography variant="h5" className={classes.fontBold}>
          {pageTitle}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbComponent;
