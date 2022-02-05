import React, { useState, Suspense, lazy, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Formik } from 'formik';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { SpacingStyles, TypographyStyles, TextFieldStyles } from './jss';
import { formatDate ,formatDateYearFirst } from './utils/functions';
const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.divider,
    marginBottom: theme.spacing(3)
  },
}));



export default function Profile() {
  const classes = useStyles();
  const textFieldClasses = TextFieldStyles();
  const typographyClasses = TypographyStyles();
  const spacingClasses = SpacingStyles();
  const [file, setFile] = useState(null);

  return (
    <div>
    <Formik
      enableReinitialize
      initialValues={{
        // Basic Information
        EmployeeCode:  '',
        HospitalNo: '',
        LastName:  'Mana-ay',
        FirstName: 'Samuel',
        MiddleName:  'Abelondon',
        Suffix: '',
        Gender:'Male',
        CivilStatus:  'Single',
        Birthdate: '1994/07/23',
        Birthplace: 'Burgos St. Pontevedra Negros Occidental',
        Nationality: 'Filipino',
        Religion: 'Baptist',
        Occupation: 'IT',
        BloodType:  'O',
        //Work Info
        Position: 'Software Engineer',
        Regularization: '2021/12/01',
        Hired: '2021/06/01',

        // Contact Information
        MobileNo:  '09561369824',
        TelephoneNo:  '222-222-222',
        EmailAddress1: 'manaaysamuel@gmail.com',
        EmailAddress2:  'manaaysam@gmail.com',

        // Current Address
        HouseNo: '',
        CurrentStreetAddress: '',
        CurrentBarangay:  '',
        CurrentCityMunicipality:  '',
        CurrentProvince: '',
        Region: '',

        // Permanent Address
        PermanentHouseNo:  '',
        PermanentStreetAddress:  '',
        PermanentBarangay: '',
        PermanentCityMunicipality:  '',
        PermanentProvince:  '',
        PermanentRegion: '',

        // Other Details
        PhilhealthNumber: '',
        PassportNo: '',
        SSSNo:  '',
        PagIbigNo: '',
        TinNo:  '',

        //In Case Of Emergency
        ContactPersonName1: '',
        ContactPersonRelation1:  '',
        ContactPersonMobileNum1:  '',
        ContactPersonName2:  '',
        ContactPersonRelation2:  '',
        ContactPersonMobileNum2:  '',
      }}
      onSubmit={(values) => { }}
      // validationSchema={personalInformationSchema}
    >
      {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <Card>
          {/* <Suspense fallback={<h3>Loading...</h3>}>
            <AddressDialog
              open={openAddDialog}
              details={addressType}
              onAgree={(location) => {
                setAddressDialogOpen(false);
                if (location.type === 'current') {
                  setFieldValue('CurrentBarangay', location?.Barangay);
                  setFieldValue('CurrentCityMunicipality', location?.TownCity);
                  setFieldValue('CurrentProvince', location?.Province);
                  setFieldValue('Region', location?.Region);
                } else {
                  setFieldValue('PermanentBarangay', location?.Barangay);
                  setFieldValue('PermanentCityMunicipality', location?.TownCity);
                  setFieldValue('PermanentProvince', location?.Province);
                  setFieldValue('PermanentRegion', location?.Region);
                }
              }}
              onDisagree={() => setAddressDialogOpen(false)}
            />
            <ReusableDialog
              disableBackdropClick
              disableEscapeKeyDown
              details={selectedDetails}
              open={openConfDialog}
              onDisagree={() => setConfirmDialogOpen(false)}
              isLoading={false}
            />
            <SuccessDialog
              disableBackdropClick
              disableEscapeKeyDown
              details={selectedDetails}
              open={openSucDialog}
              onAgree={() => {
                dispatch(getPersonalDetails(DataCenterID));
                setSuccessDialogOpen(false);
              }}
              onDisagree={() => setSuccessDialogOpen(false)}
              isLoading={false}
            />
          </Suspense> */}
          <CardContent className={textFieldClasses.textFieldSection}>
          <Grid container spacing={1} direction="column" alignItems="center" justify="center" style={{ minHeight: '10vh', marginBottom: 20 }}>
              <Grid item lg={3} md={6} xs={12}>
                <img src={''} alt={''} style={{ height: 150, width: 200, alignItems: 'center' }} />
              </Grid>
            </Grid>
            <Divider classes={{ root: classes.divider }} />
          <Typography
          variant="h5"
          className={clsx(
            typographyClasses.fontBold,
            spacingClasses.marginBottom2,
            spacingClasses.marginTop1
          )}
        >
              Work Information
            </Typography>
          
            <Grid container className={spacingClasses.marginBottom2}>
            <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Position Title"  secondary={values.Position}/>
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Date Hire"  secondary={formatDate(values.Hired)}/>
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Regularization Date" secondary={formatDate(values.Regularization)}/>
              </ListItem>
            </List>
              </Grid>
            
            </Grid>

  

          <Divider classes={{ root: classes.divider }} />
          <Typography
          variant="h5"
          className={clsx(
            typographyClasses.fontBold,
            spacingClasses.marginBottom2,
            spacingClasses.marginTop1
          )}
        >
              Basic Information
            </Typography>
          
            <Grid container className={spacingClasses.marginBottom2}>
            <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Employee Code" secondary={values.EmployeeCode} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Last Name" secondary={values.LastName} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={values.FirstName} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Middle Name" secondary={values.MiddleName} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Suffix" secondary={values.Suffix} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Extension Name" secondary={values.ExtensionName} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Birthdate" secondary={formatDate(values.Birthdate)} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Gender" secondary={values.Gender} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Civil Status" secondary={values.CivilStatus} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
             <List>
              <ListItem>
                <ListItemText primary="Religion" secondary={values.Religion} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
             <List>
              <ListItem>
                <ListItemText primary="Nationality" secondary={values.Nationality} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Blood Type" secondary={values.BloodType} />
              </ListItem>
            </List>
              </Grid>
            </Grid>




            <Divider classes={{ root: classes.divider }} />

            <Typography
          variant="h5"
          className={clsx(
            typographyClasses.fontBold,
            spacingClasses.marginBottom2,
          )}
        >
              Contact Information
            </Typography>
            <Grid container className={spacingClasses.marginBottom2}>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Telephone No." secondary={values.TelephoneNo} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Mobile No." secondary={values.MobileNo} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Personal Email" secondary={values.EmailAddress1} />
              </ListItem>
            </List>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
              <ListItem>
                <ListItemText primary="Company Email" secondary={values.EmailAddress2} />
              </ListItem>
            </List>
              </Grid>
            </Grid>

            <Divider classes={{ root: classes.divider }} />

            <Typography
          variant="h5"
          className={clsx(
            typographyClasses.fontBold,
            spacingClasses.marginBottom2,
          )}
        >

              Current Address
            </Typography>
            <Hidden lgUp>
            <Grid container className={spacingClasses.marginBottom2}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >
             <List>
              <ListItem>
                <ListItemText primary="Current House No." secondary={values.HouseNo} />
              </ListItem>
            </List>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >
                  <List>
                    <ListItem>
                      <ListItemText primary="Current Street" secondary={values.CurrentStreetAddress} />
                    </ListItem>
                  </List>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >

                      <List>
                    <ListItem>
                      <ListItemText primary="Current Barangay" secondary={values.CurrentBarangay} />
                    </ListItem>
                  </List>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >
                    <List>
                    <ListItem>
                      <ListItemText primary="Current City" secondary={values.CurrentCityMunicipality} />
                    </ListItem>
                  </List>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >
                          <List>
                    <ListItem>
                      <ListItemText primary="Current Province" secondary={values.CurrentProvince} />
                    </ListItem>
                  </List>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                  >
                          <List>
                    <ListItem>
                      <ListItemText primary="Current Region" secondary={values.Region} />
                    </ListItem>
                  </List>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
   
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 2, marginRight: 3 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent House No." secondary={values.PermanentHouseNo} />
                    </ListItem>
                  </List>

                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 5, marginLeft: 2, marginRight: 3 }}>

                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Street" secondary={values.PermanentStreetAddress} />
                    </ListItem>
                  </List>

                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 5, marginLeft: 2, marginRight: 3 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Barangay" secondary={values.PermanentBarangay} />
                    </ListItem>
                  </List>
     
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 5, marginLeft: 2, marginRight: 3 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent City" secondary={values.PermanentCityMunicipality} />
                    </ListItem>
                  </List>
     
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 5, marginLeft: 2, marginRight: 3 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Province" secondary={values.PermanentProvince} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 5, marginLeft: 2, marginRight: 3 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Region" secondary={values.PermanentRegion} />
                    </ListItem>
                  </List>

                </Grid>
              </Grid>
            </Hidden>

            <Hidden mdDown>
              <Grid container spacing={2} className={spacingClasses.marginTop1}>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current House No." secondary={values.HouseNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent House No." secondary={values.PermanentHouseNo} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current Street" secondary={values.CurrentStreetAddress} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Street" secondary={values.PermanentStreetAddress} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current Barangay" secondary={values.CurrentBarangay} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Barangay" secondary={values.PermanentBarangay} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current City" secondary={values.CurrentCityMunicipality} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent City" secondary={values.PermanentCityMunicipality} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current Province" secondary={values.CurrentProvince} />
                    </ListItem>
                  </List>

                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Province" secondary={values.PermanentProvince} />
                    </ListItem>
                  </List>
   
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Current Region" secondary={values.Region} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Permanent Region" secondary={values.PermanentRegion} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Hidden>

            <Divider classes={{ root: classes.divider }} />
             <Typography
          variant="h5"
          className={clsx(
            typographyClasses.fontBold,
            spacingClasses.marginBottom2,
            spacingClasses.marginTop1
          )}
        >
              
              In Case of Emergency
            </Typography>
            <Hidden mdDown>
            <Grid container className={spacingClasses.marginBottom2}>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary={values.ContactPersonName1} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary={values.ContactPersonName2} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Relation" secondary={values.ContactPersonRelation1} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Relation" secondary={values.ContactPersonRelation2} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Mobile No." secondary={values.ContactPersonMobileNum1} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                <List>
                    <ListItem>
                      <ListItemText primary="Mobile No." secondary={values.ContactPersonMobileNum2} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden lgUp>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary={values.ContactPersonName1} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Relation" secondary={values.ContactPersonRelation1} />
                    </ListItem>
                  </List>
    
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Telephone No." secondary={values.ContactPersonMobileNum1} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary={values.ContactPersonName2} />
                    </ListItem>
                  </List>
   
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>
                <List>
                    <ListItem>
                      <ListItemText primary="Relation" secondary={values.ContactPersonRelation2} />
                    </ListItem>
                  </List>
      
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginLeft: 5, marginRight: 10 }}>4
                <List>
                    <ListItem>
                      <ListItemText primary="Telephone No." secondary={values.ContactPersonMobileNum2} />
                    </ListItem>
                  </List>

                </Grid>
              </Grid>
            </Hidden>

            <Divider classes={{ root: classes.divider }} />
            <Typography
              variant="h5"
              className={clsx(typographyClasses.fontBold, spacingClasses.marginBottom2, spacingClasses.marginTop5)}
            >
              Other Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} xs={12}>
              <List>
                    <ListItem>
                      <ListItemText primary="SSS No." secondary={values.SSSNo} />
                    </ListItem>
                  </List>
     
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
              <List>
                    <ListItem>
                      <ListItemText primary="Pag-ibig No." secondary={values.PagIbigNo} />
                    </ListItem>
                  </List>

              </Grid>

              <Grid item lg={6} md={6} xs={12}>
              <List>
                    <ListItem>
                      <ListItemText primary="Philhealth No." secondary={values.PhilhealthNumber} />
                    </ListItem>
                  </List>
         
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
              <List>
                    <ListItem>
                      <ListItemText primary="Tin No." secondary={values.TinNo} />
                    </ListItem>
                  </List>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Formik>
  </div>
    // <Box
    //   component="form"
    //   alignContent="center"
    //   position="absolute"
    //   top="10%"
    //   left="25%"
    //   margin-top="-50px"
    //   width="100"
    //   margin-left="-50px"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1 },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <div>
    //     <TextField
    //       required
    //       id="FN"
    //       label="First Name"
    //       defaultValue="John"
    //       fullWidth
    //     />
    //     <TextField
    //       required
    //       id="LN"
    //       label="Last Name"
    //       defaultValue="Doe"
    //       fullWidth
    //     />

    //     <div >


    //     </div>
    //     <div>
    //       <TextField
    //         required
    //         id="MN"
    //         label="Middle Name"
    //         defaultValue="Vahn"
    //       />
    //       <TextField
    //         required
    //         id="Age"
    //         type="number"
    //         label="Age"
    //         defaultValue="27"
    //       />
    //        <FormControl component="fieldset">
    //       <FormLabel component="legend">Gender</FormLabel>
    //       <RadioGroup row aria-label="gender" name="row-radio-buttons-group" >
    //         <FormControlLabel value="female" control={<Radio />} label="Female" />
    //         <FormControlLabel value="male" control={<Radio />} label="Male" />
    //         <FormControlLabel value="other" control={<Radio />} label="Other" />
    //       </RadioGroup>
    //     </FormControl>
    //     </div>

       

    //     <TextField
    //       label="Address"
    //       id="Add"
    //       multiline
    //       fullWidth
    //       rows={4}
    //       maxRows={7}
    //       defaultValue="Burgos St. Pontevedra, Negros Occidental"
    //     />
    //   </div>
    //   {/* <div>
    //   <TextField
    //       required
    //       id="FN"
    //       label="First Name"
    //       defaultValue="John"
    //     />
    //     <TextField
    //       required
    //       id="LN"
    //       label="Last Name"
    //       defaultValue="Doe"
    //     />
    //       <TextField
    //       required
    //       id="MN"
    //       label="Middle Name"
    //       defaultValue="Vahn"
    //     />
    //      <TextField
    //       required
    //       id="Age"
    //       type="number"
    //       label="Age"
    //       defaultValue="27"
    //     />
    //   </div> */}
    // </Box>
  );
}