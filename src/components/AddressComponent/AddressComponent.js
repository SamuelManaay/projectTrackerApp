import React, { Fragment } from 'react';
import HeaderDialog from '../Dialogs/HeaderDialog';
import BodyDialog from '../Dialogs/BodyDialog';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

// Material UI
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';

// JSS
import { TableListStyles, ButtonStyles, SpacingStyles } from '../../jss';

// Formik
import { Formik } from 'formik';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearLocation, searchLocation } from 'actions';

// Utils
import { SlideUp } from 'utils/animations';

const useStyles = makeStyles((theme) => ({
  // Card
  content: {
    paddingTop: theme.spacing(1),
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
    },
  },
  wrapTableCell: {
    wordBreak: 'break-word',
  },
}));

const AddressComponent = ({ open, details, onAgree, onDisagree }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tableClasses = TableListStyles();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();

  const isLoading = useSelector((state) => state.location.isLoading);
  const locations = useSelector((state) => state.location.locations);

  const selectLocation = (location) => {
    if (details === 'current') {
      onAgree({ ...location, type: 'current' });
    } else {
      onAgree(location);
    }
    dispatch(clearLocation());
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onDisagree}
        open={open}
        TransitionComponent={SlideUp}
        fullWidth={true}
        maxWidth={'md'}
      // maxWidth={'sm'}
      >
        <HeaderDialog onClose={onDisagree}>Address</HeaderDialog>
        <BodyDialog dividers>
          <Formik
            initialValues={{
              Barangay: '',
              City: '',
              Province: '',
            }}
            onSubmit={(values) => {
              dispatch(searchLocation(values));
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <TextFieldComponent
                      size={'small'}
                      variant={'outlined'}
                      fullWidth={true}
                      type={'text'}
                      label={'Barangay'}
                      name={'Barangay'}
                      value={values.Barangay}
                      helperText={touched.Barangay ? errors.Barangay : ''}
                      error={touched.Barangay && Boolean(errors.Barangay)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <TextFieldComponent
                      size={'small'}
                      variant={'outlined'}
                      fullWidth={true}
                      type={'text'}
                      label={'City'}
                      name={'City'}
                      value={values.City}
                      helperText={touched.City ? errors.City : ''}
                      error={touched.City && Boolean(errors.City)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <TextFieldComponent
                      size={'small'}
                      variant={'outlined'}
                      fullWidth={true}
                      type={'text'}
                      label={'Province'}
                      name={'Province'}
                      value={values.Province}
                      helperText={touched.Province ? errors.Province : ''}
                      error={touched.Province && Boolean(errors.Province)}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      className={clsx(spacingClasses.marginBottom4, spacingClasses.right)}
                    >
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                        size="small"
                        startIcon={<SearchIcon />}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          {locations && locations.length > 0 ? (
            <Fragment>
              <Hidden mdDown>
                <Paper className={tableClasses.root}>
                  <TableContainer className={tableClasses.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Action</TableCell>
                          <TableCell>Barangay</TableCell>
                          <TableCell>City</TableCell>
                          <TableCell>Province</TableCell>
                          <TableCell>Region</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {locations.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <ButtonComponent
                                function={() => selectLocation(location)}
                                style={buttonClasses.buttonPrimary}
                                text={'Select'}
                              />
                            </TableCell>
                            <TableCell>{location.Barangay}</TableCell>
                            <TableCell>{location.TownCity}</TableCell>
                            <TableCell>{location.Province}</TableCell>
                            <TableCell>{location.Region}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Hidden>
              <Hidden lgUp>
                <Grid container spacing={2}>
                  {locations.map((location, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card className={classes.card}>
                        <CardContent className={classes.content}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell variant="head">Barangay</TableCell>
                                <TableCell variant="body">{location.Barangay}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell variant="head">City</TableCell>
                                <TableCell variant="body">{location.TownCity}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell variant="head">Province</TableCell>
                                <TableCell variant="body">{location.Province}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell variant="head">Region</TableCell>
                                <TableCell variant="body">{location.Region}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <ButtonComponent
                            fullWidth={true}
                            function={() => selectLocation(location)}
                            style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginTop3)}
                            text={'Select'}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Hidden>
            </Fragment>
          ) : (
              ''
            )}
        </BodyDialog>
      </Dialog>
    </div>
  );
};

export default AddressComponent;
