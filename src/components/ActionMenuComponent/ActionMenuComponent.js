import React, { lazy } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
// JSS
import { SpacingStyles, TypographyStyles } from '../../jss';

// Lazy Load
const DialogUserRegistration = lazy(() => import('../../pages/Private/Master/Main/UserRegistration/UserRegistration'));

const ActionMenuComponent = () => {
  const Origin = localStorage.getItem('origin');
  const OriginList = localStorage.getItem('OriginList');
  const LShasAccount = localStorage.getItem('hasAccount');
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();
  const history = useHistory();
  const location = useLocation();
  var hasAccount; //= location.pathname.split('/')[4];
  const [openNewRegisteredDialog, setNewRegistrationDialog] = React.useState(false);
  const openNewRegistrationDialog = () => {
    setNewRegistrationDialog(true);
  };
  if (LShasAccount == null || LShasAccount == '') {
    hasAccount = location.pathname.split('/')[4];
  } else {
    hasAccount = LShasAccount;
  }

  const userAccess = useSelector((state) => state.userAccess);

  return (
    <Paper className={clsx(spacingClasses.padding2)}>
      <Typography
        variant="h4"
        className={clsx(typographyClasses.fontBold, spacingClasses.center, spacingClasses.marginBottom1)}
      >
        Actions
      </Typography>
      <Divider style={{ marginBottom: 5, marginLeft: '-16px', marginRight: '-16px' }} />
      <DialogUserRegistration
        open={openNewRegisteredDialog}
        onAgree={() => setNewRegistrationDialog(false)}
        onDisagree={() => setNewRegistrationDialog(false)}
      />

      {/*  ============= User Registration ================= */}

      <div hidden={Origin == 'EmployeeProfile' || hasAccount == 'true' ? true : false}>
        {(OriginList === 'Archived Employees' ||
          (location.pathname.indexOf('/archived-employees/') >= 0 &&
            userAccess.master.archivedEmployees.userRegistration.grantAccess) ||
          OriginList === 'Employees' ||
          (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.userRegistration.grantAccess) ||
          location.pathname === '/employees/profile') && (
          <Button
            onClick={() => openNewRegistrationDialog()}
            fullWidth
            variant={openNewRegisteredDialog === true ? 'contained' : 'outlined'}
            className={spacingClasses.marginTop1}
          >
            User Registration
          </Button>
        )}
      </div>
      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 &&
          userAccess.master.employees.userEducationalAttainment.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.educationalAttainment.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.educationalAttainment.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/educational-attainment`)}
          fullWidth
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/educational-attainment`
              ? 'contained'
              : 'outlined'
          }
          className={spacingClasses.marginTop1}
        >
          Educational Attainment
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.familyAndDependents.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.familyDependents.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.familyAndDependants.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/family-and-dependents`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/family-and-dependents`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Family and Dependents
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.leaveSettings.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.leaveSettings.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.leaveSettings.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/leave-settings`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/leave-settings`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Leave Settings
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.leaveRecords.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.leaveRecords.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.leaveRecords.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/leave-records`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/leave-records`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Leave Records
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.salarySettings.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.salarySettings.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.salarySettings.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/salary-info`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/salary-info`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Salary Settings
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.workInformation.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.workInformation.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.workInformation.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/work-information`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/work-information`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Work Information
        </Button>
      )}

      {(OriginList === 'Employees' ||
        (location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.dailyTaskReport.dashboard) ||
        OriginList === 'Archived Employees' ||
        (location.pathname.indexOf('/archived-employees/') >= 0 &&
          userAccess.master.archivedEmployees.dailyTaskReport.dashboard) ||
        OriginList === 'Employee Profile' ||
        (location.pathname === '/employees/profile' &&
          userAccess.employees.employeeProfile.dailyTaskReport.dashboard)) && (
        <Button
          onClick={() => history.push(`/master/employee-daily-task`)}
          variant={
            openNewRegisteredDialog === true
              ? 'outlined'
              : location.pathname === `/master/employee-daily-task`
              ? 'contained'
              : 'outlined'
          }
          fullWidth
          className={spacingClasses.marginTop1}
        >
          Daily Task Report
        </Button>
      )}

      {/* <Button
        onClick={() => history.push('/master/employment')}
        variant="outlined"
        fullWidth
        className={spacingClasses.marginTop1}
      >
        Employment
      </Button> */}
      {/* <Button
        onClick={() => history.push('/master/shifting')}
        variant="outlined"
        fullWidth
        className={spacingClasses.marginTop1}
      >
        Shifting
      </Button> */}
      {/* <Button
        onClick={() => history.push('/master/work-assignment')}
        variant="outlined"
        fullWidth
        className={spacingClasses.marginTop1}
      >
        Work Assignment
      </Button> */}
      {/* <Button
        onClick={() => history.push('/master/other-documents')}
        variant="outlined"
        fullWidth
        className={spacingClasses.marginTop1}
      >
        Other Documents
      </Button> */}
      <Button
        onClick={() => history.push(`/master/user-access`)}
        variant={
          openNewRegisteredDialog === true
            ? 'outlined'
            : location.pathname === `/master/user-access`
            ? 'contained'
            : 'outlined'
        }
        fullWidth
        className={spacingClasses.marginTop1}
      >
        User Access
      </Button>
    </Paper>
  );
};

export default ActionMenuComponent;
