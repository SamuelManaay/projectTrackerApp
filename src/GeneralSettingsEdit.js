import React, { useState, Suspense, lazy, Fragment } from 'react';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
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
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { SpacingStyles, TypographyStyles, TextFieldStyles, ButtonStyles } from './jss';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
const DropdownComponent = lazy(() => import('../src/components/DropdownComponent/DropdownComponent'));

const useStyles = makeStyles((theme) => ({
    divider: {
        background: theme.palette.divider,
        marginBottom: theme.spacing(3)
    },
}));

const rating = [
    { id: 1, Description: "3 - point rating" },
    { id: 2, Description: "10 - point rating" },
    { id: 3, Description: "10 - point rating(reversed)" },
];


const RTPA = [
    { id: 1, Description: "Employee" },
    { id: 2, Description: "Staff" },
    { id: 3, Description: "Student" },
    { id: 3, Description: "Volunteer" },
];

const PAPO = [
    { id: 1, Description: "Department" },
    { id: 2, Description: "Group" },
    { id: 3, Description: "Role" },
];

const SEB = [
    { id: 1, Description: "Name - Surname - Department" },
    { id: 2, Description: "Surname - Name - Department" },
    { id: 3, Description: "Department - Name - Surname" },
    { id: 3, Description: "Department - Surname - Name" },
    { id: 3, Description: "Department - Employe's ID" },
    { id: 3, Description: "Employe's ID" },
];
const SENA = [
    { id: 1, Description: "Name Surname " },
    { id: 1, Description: "Name, Surname " },
    { id: 2, Description: "Surname Name " },
    { id: 2, Description: "Surname, Name " },

];

const SEI = [
    { id: 1, Description: "Yes" },
    { id: 2, Description: "No" },
];


const Overview = () => {
    const typographyClasses = TypographyStyles();
    const spacingClasses = SpacingStyles();
    const buttonClasses = ButtonStyles();
    const classes = useStyles();
    const textFieldClasses = TextFieldStyles();
    const history = useHistory();
    const isLoading = false;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{

                    CompanyName: 'Sample Company',
                    RatingSystem: '10 - point Rating',
                    StartingYear: 2015,
                    RTPA: 'Employee',
                    PAPO: 'Department',
                    SEB: 'Surname - Name - Department',
                    SENA: 'Surname Name',
                    SEI: 'Yes',
                }}
                onSubmit={(values) => { }}
            //  validationSchema={personalInformationSchema}
            >
                {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <Fragment>
                        <Suspense fallback={<h3>Loading...</h3>}>
                            <Grid container className={spacingClasses.marginBottom2}>

                                <Grid item lg={6} md={6} xs={12}>
                                    <Typography
                                        style={{ marginLeft: 10 }}
                                        variant="h5"
                                        className={clsx(
                                            typographyClasses.fontBold,
                                            spacingClasses.marginBottom2,
                                            spacingClasses.marginTop1
                                        )}
                                    >
                                        General Settings
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ padding: 15 }} className={spacingClasses.marginBottom2}>
                                <Grid item lg={6} md={6} xs={12}>

                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Company Name"
                                        defaultValue={values.CompanyName}
                                        size="small"
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={rating} label={'Rating System'} variant={'outlined'} />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>

                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Company Name"
                                        defaultValue={values.StartingYear}
                                        size="small"
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={RTPA} label={'Refer To People as'} variant={'outlined'} />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={PAPO} label={'People are part of'} variant={'outlined'} />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={SEB} label={'Sort Employees by'} variant={'outlined'} />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={SENA} label={'Sort Employees name as'} variant={'outlined'} />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <DropdownComponent datas={SEI} label={'Sort Employees ID'} variant={'outlined'} />
                                </Grid>
                            </Grid>
                            <Grid container className={spacingClasses.marginTop5} style={{ marginLeft: 15 }}>
                                <ButtonComponent
                                    style={buttonClasses.buttonWarning}
                                    icon={<SaveAltIcon />}
                                    color="primary"
                                    text={'Save'}
                                    // function={() => openAddorEditjobGradeMethod(true, jobGrade)}
                                />
                            </Grid>
                        </Suspense>
                    </Fragment>
                )}
            </Formik>

        </div>
    );
};

export default Overview;

// export default function Profile() {
//     const classes = useStyles();
//     const textFieldClasses = TextFieldStyles();
//     const typographyClasses = TypographyStyles();
//     const spacingClasses = SpacingStyles();
//     const [file, setFile] = useState(null);

//     const buttonClasses = ButtonStyles();

//     return (
//         <div>
//             <Formik
//                 enableReinitialize
//                 initialValues={{

//                     CompanyName: 'Sample Company',
//                     RatingSystem: '10 - point Rating',
//                     StartingYear: 2015,
//                     RTPA: 'Employee',
//                     PAPO: 'Department',
//                     SEB: 'Surname - Name - Department',
//                     SENA: 'Surname Name',
//                     SEI: 'Yes',
//                 }}
//                 onSubmit={(values) => { }}
//                 validationSchema={personalInformationSchema}
//             >
//                 {({ values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
//                     <div style={{ marginLeft: 10 }}>
//                         <Divider classes={{ root: classes.divider }} />
//                         <Typography
//                             style={{ marginLeft: 10 }}
//                             variant="h5"
//                             className={clsx(
//                                 typographyClasses.fontBold,
//                                 spacingClasses.marginBottom2,
//                                 spacingClasses.marginTop1
//                             )}
//                         >
//                             General Settings
//                         </Typography>

//                         <Grid container className={spacingClasses.marginBottom2}>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <TextField
//                                     required
//                                     id="outlined-required"
//                                     label="Company Name"
//                                     defaultValue={values.CompanyName}
//                                 />

//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <DropdownComponent datas={rating} label={'Rating System'} variant={'outlined'} />

//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <TextField
//                                     required
//                                     id="outlined-required"
//                                     label="Starting Year"
//                                     defaultValue={values.StartingYear}

//                                 />


//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <DropdownComponent datas={RTPA} label={'Refer to people as'} variant={'outlined'} />

//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>
//                                 <DropdownComponent datas={PAPO} label={'People are part of'} variant={'outlined'} />



//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <DropdownComponent datas={SEB} label={'Sort Employees by'} variant={'outlined'} />


//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <DropdownComponent datas={SENA} label={'Show employee name as'} variant={'outlined'} />

//                             </Grid>
//                             <Grid item lg={6} md={6} xs={12}>

//                                 <DropdownComponent datas={SEI} label={'Show employee ID'} variant={'outlined'} />

//                             </Grid>
//                             <Grid container className={spacingClasses.marginTop5} style={{ marginLeft: 10 }}>
//                                 <ButtonComponent
//                                     style={buttonClasses.buttonWarning}
//                                     icon={<SaveAltIcon />}
//                                     color="primary"
//                                     text={'Save'}
//                                     function={() => openAddorEditjobGradeMethod(true, jobGrade)}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </div>
//                 )}
//             </Formik>
//         </div>

//     );
// }