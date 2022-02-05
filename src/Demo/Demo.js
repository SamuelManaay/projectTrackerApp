import React, { Suspense, lazy } from 'react';

// Material UI
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { DataGrid } from '@material-ui/data-grid';

// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TextFieldStyles } from '../jss';

// Formik
import { Formik, FieldArray } from 'formik';

// Lazy Load
const DialogFormFilled = lazy(() => import('./DialogFormFilled'));
const DialogFormNormal = lazy(() => import('./DialogFormNormal'));
const DialogFormOutlined = lazy(() => import('./DialogFormOutlined'));
const TextFieldComponent = lazy(() => import('../components/TextFieldComponent/TextFieldComponent'));
const ButtonComponent = lazy(() => import('../components/ButtonComponent/ButtonComponent'));
const DatePickerComponent = lazy(() => import('../components/DatePickerComponent/DatePickerComponent'));
const DropdownComponent = lazy(() => import('../components/DropdownComponent/DropdownComponent'));
const SearchComponent = lazy(() => import('../components/SearchComponent/SearchComponent'));

const useStyles = makeStyles(() => ({
  icon: {
    height: 32,
    width: 32,
  },
}));

export default function Demo() {
  const classes = useStyles();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();
  const textFieldClasses = TextFieldStyles();

  const isLoading = false;
  const [openAdFormFilledDialog, setAddDialogFormFilledOpen] = React.useState(false);
  const [openAdFormOutlinedDialog, setAddDialogFormOutlinedOpen] = React.useState(false);
  const [openAdFormNormalDialog, setAddDialogFormNormalOpen] = React.useState(false);

  const openAddFormFilledDialog = () => {
    setAddDialogFormFilledOpen(true);
  };

  const openAddFormOutlinedDialog = () => {
    setAddDialogFormOutlinedOpen(true);
  };
  const openAddFormNormalDialog = () => {
    setAddDialogFormNormalOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'requestedDate', headerName: 'Requested Date', width: 130 },
    { field: 'request', headerName: 'Requested', width: 130 },
    { field: 'code', headerName: 'Code', width: 130 },
    { field: 'requestTypeOf', headerName: 'Request Type Of', width: 150 },
    { field: 'requestedBy', headerName: 'Requested By', width: 130 },
    { field: 'requestedRemarks', headerName: 'Request Remarks', width: 150 },
  ];

  const rows = [
    {
      id: 1,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
    {
      id: 2,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
    {
      id: 3,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
    {
      id: 4,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
    {
      id: 5,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
    {
      id: 6,
      requestedDate: '10/10/2020',
      request: 'Paid Leave',
      code: '#A78DJO',
      requestTypeOf: 'Leave',
      requestedBy: 'Romer Beth Court',
      requestedRemarks: 'Body Pain',
    },
  ];

  const dropdownStatuses = [
    {
      id: 1,
      name: 'Approved',
    },
    {
      id: 2,
      name: 'In Progress',
    },
  ];

  const roles = [
    {
      id: 1,
      name: 'Admin',
    },
    {
      id: 2,
      name: 'Employee',
    },
  ];

  return (
    <div>
      <Suspense fallback={<CircularProgress color="inherit" size={50} style={{ marginTop: 30 }} />}>
        <Grid container spacing={2} className={spacingClasses.marginBottom2}>
          <Grid item lg={8} md={7} sm={6} xs={12}>
            <Typography variant="h3" className={typographyClasses.fontBold}>
              Demo
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={spacingClasses.marginBottom2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ButtonComponent
              style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginRight1)}
              text={'Add New'}
              icon={<AddIcon />}
              function={() => openAddFormFilledDialog()}
            />
            <ButtonComponent
              style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginRight1)}
              text={'Add New'}
              icon={<AddIcon />}
              function={() => openAddFormOutlinedDialog()}
            />
            <ButtonComponent
              style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginRight1)}
              text={'Add New'}
              icon={<AddIcon />}
              function={() => openAddFormNormalDialog()}
            />
            <DialogFormFilled
              open={openAdFormFilledDialog}
              onAgree={() => setAddDialogFormFilledOpen(false)}
              onDisagree={() => setAddDialogFormFilledOpen(false)}
            />
            <DialogFormOutlined
              open={openAdFormOutlinedDialog}
              onAgree={() => setAddDialogFormOutlinedOpen(false)}
              onDisagree={() => setAddDialogFormOutlinedOpen(false)}
            />
            <DialogFormNormal
              open={openAdFormNormalDialog}
              onAgree={() => setAddDialogFormNormalOpen(false)}
              onDisagree={() => setAddDialogFormNormalOpen(false)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2} className={spacingClasses.marginBottom2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <DropdownComponent datas={dropdownStatuses} variant={'outlined'} label={'Dropdown label'} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <SearchComponent />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={spacingClasses.marginBottom2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <DatePickerComponent />
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <Formik
                  initialValues={{
                    EHContactList: [
                      {
                        Name: '',
                        Role: '',
                      },
                    ],
                  }}
                  onSubmit={(values) => {
                    // console.log(values);
                  }}
                >
                  {({ values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <FieldArray name="EHContactList">
                      {({ remove, push }) => (
                        <Paper>
                          <TableContainer>
                            <Table stickyHeader>
                              <TableBody>
                                {values.EHContactList.map((record, idx) => {
                                  return (
                                    <TableRow key={idx}>
                                      <TableCell>
                                        <TextFieldComponent
                                          size={'small'}
                                          type={'text'}
                                          label={'Name'}
                                          name={`EHContactList.${idx}.Name`}
                                          variant={'outlined'}
                                          value={values.EHContactList[idx] && values.EHContactList[idx].Name}
                                          handleChange={handleChange}
                                          onBlur={() => handleBlur}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <DropdownComponent
                                          label={'Role'}
                                          datas={roles}
                                          variant={'outlined'}
                                          name={`EHContactList.${idx}.Role`}
                                          value={values.EHContactList[idx] && values.EHContactList[idx].Role}
                                          handleChange={handleChange}
                                          onBlur={() => handleBlur}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <ButtonComponent
                                          style={buttonClasses.buttonError}
                                          text={'Remove'}
                                          icon={<CloseSharpIcon />}
                                          function={() => remove(idx)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                                <TableRow>
                                  <TableCell colSpan={2}>
                                    <ButtonComponent
                                      text={'Add Row'}
                                      icon={<AddIcon />}
                                      function={() =>
                                        push({
                                          Name: '',
                                          Role: '',
                                        })
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      )}
                    </FieldArray>
                  )}
                </Formik>
              </Grid>
            </Grid>

            {isLoading ? (
              <LinearProgress />
            ) : rows && rows.length > 0 ? (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid columns={columns} rows={rows} pageSize={5} />
              </div>
            ) : (
              <Typography variant="h6">No Employee Requests Available...</Typography>
            )}
          </Grid>

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                <Typography className={classes.heading}>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                <Typography className={classes.heading}>Accordion 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                <Typography className={classes.heading}>Accordion 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                <Typography className={classes.heading}>Accordion 5</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Card style={{ marginBottom: 20, marginTop: 20 }}>
          <CardContent className={textFieldClasses.textFieldSection}>
            <Typography
              variant="h5"
              className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom2, spacingClasses.marginTop1)}
            >
              Basic Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'filled'}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card style={{ marginBottom: 20, marginTop: 20 }}>
          <CardContent className={textFieldClasses.textFieldSection}>
            <Typography
              variant="h5"
              className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom2, spacingClasses.marginTop1)}
            >
              Basic Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent
                  size={'small'}
                  type={'text'}
                  label={'Employee Code'}
                  name={'EmployeeCode'}
                  variant={'outlined'}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card style={{ marginBottom: 20, marginTop: 20 }}>
          <CardContent className={textFieldClasses.textFieldSection}>
            <Typography
              variant="h5"
              className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom2, spacingClasses.marginTop1)}
            >
              Basic Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextFieldComponent size={'small'} type={'text'} label={'Employee Code'} name={'EmployeeCode'} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
