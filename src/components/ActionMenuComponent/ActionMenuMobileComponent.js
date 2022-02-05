import React, { lazy } from 'react';
import HeaderDialog from '../Dialogs/HeaderDialog';
import BodyDialog from '../Dialogs/BodyDialog';
import FooterDialog from '../Dialogs/FooterDialog';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';

// JSS
import { SpacingStyles, TypographyStyles } from '../../jss';

// Utils
import { SlideUp } from 'utils/animations';

const DialogUserRegistration = lazy(() => import('../../pages/Private/Master/Main/UserRegistration/UserRegistration'));

const ActionMenuMobileComponent = ({ open, onAgree, onDisagree }) => {
  const OriginList = localStorage.getItem('OriginList');
  const Origin = localStorage.getItem('origin');
  const LShasAccount = localStorage.getItem('hasAccount');
  const spacingClasses = SpacingStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  var hasAccount;
  const [openNewRegisteredDialog, setNewRegistrationDialog] = React.useState(false);

  const openNewRegistrationDialog = () => {
    setNewRegistrationDialog(true);
  };
  const navigateTo = (route) => {
    history.push(route);
    onAgree();
  };
  if (LShasAccount == null || LShasAccount == '') {
    hasAccount = location.pathname.split('/')[4];
  } else {
    hasAccount = LShasAccount;
  }

  const userAccess = useSelector((state) => state.userAccess);

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onDisagree}
        open={open}
        TransitionComponent={SlideUp}
        fullScreen
      >
        <HeaderDialog onClose={onDisagree}>Actions</HeaderDialog>

        <BodyDialog dividers>
          <DialogUserRegistration
            open={openNewRegisteredDialog}
            onAgree={() => setNewRegistrationDialog(false)}
            onDisagree={() => setNewRegistrationDialog(false)}
          />

          {/* <div hidden={Orgin == 'EmployeeProfile' || hasAccount == 'true' ? true : false}>
            {((location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.userRegistration.grantAccess) ||
              (location.pathname.indexOf('/employees/') >= 0 &&
                userAccess.master.employees.userRegistration.grantAccess) ||
              location.pathname === '/employees/profile') && (
              <Button
                onClick={() => openNewRegistrationDialog()}
                fullWidth
                variant="outlined"
                className={spacingClasses.marginTop1}
              >
                User Registration
              </Button>
            )}
          </div>

          {((location.pathname.indexOf('/employees/') >= 0 &&
            userAccess.master.employees.userEducationalAttainment.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.educationalAttainment.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.educationalAttainment.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/educational-attainment`)}
              fullWidth
              variant="outlined"
              className={spacingClasses.marginTop1}
            >
              Educational Attainment
            </Button>
          )}

          {((location.pathname.indexOf('/employees/') >= 0 &&
            userAccess.master.employees.familyAndDependents.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.familyDependents.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.familyAndDependants.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/family-and-dependents`)}
              variant="outlined"
              fullWidth
              className={spacingClasses.marginTop1}
            >
              Family and Dependents
            </Button>
          )}

          {((location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.leaveSettings.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.leaveSettings.dashboard) ||
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

          {((location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.leaveRecords.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.leaveRecords.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.leaveRecords.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/leave-records`)}
              variant="outlined"
              fullWidth
              className={spacingClasses.marginTop1}
            >
              Leave Records
            </Button>
          )}

          {((location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.salarySettings.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.salarySettings.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.salarySettings.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/salary-info`)}
              variant="outlined"
              fullWidth
              className={spacingClasses.marginTop1}
            >
              Salary Settings
            </Button>
          )}

          {((location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.workInformation.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.workInformation.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.workInformation.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/work-information`)}
              variant="outlined"
              fullWidth
              className={spacingClasses.marginTop1}
            >
              Work Information
            </Button>
          )}

          {((location.pathname.indexOf('/employees/') >= 0 && userAccess.master.employees.dailyTaskReport.dashboard) ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.dailyTaskReport.dashboard) ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.dailyTaskReport.dashboard)) && (
            <Button
              onClick={() => history.push(`/`)}
              variant={
                openNewRegisteredDialog === true ? 'outlined' : location.pathname === `/` ? 'contained' : 'outlined'
              }
              fullWidth
              className={spacingClasses.marginTop1}
            >
              Daily Task Report
            </Button>
          )} */}
          {/* <Button
            onClick={() => history.push('/master/educational-attainment')}
            fullWidth
            variant="outlined"
            className={spacingClasses.marginTop1}
          >
            Educational Attainment
          </Button> */}
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
            onClick={() => history.push('/master/family-and-dependents')}
            variant="outlined"
            fullWidth
            className={spacingClasses.marginTop1}
          >
            Family and Dependents
          </Button> */}
          {/* <Button
            onClick={() => history.push('/master/leave-settings')}
            variant="outlined"
            fullWidth
            className={spacingClasses.marginTop1}
          >
            Leave Settings
          </Button> */}
          {/* <Button onClick={() => history.push('/')} variant="outlined" fullWidth className={spacingClasses.marginTop1}>
            Leave Records
          </Button> */}
          {/* <Button
            onClick={() => history.push('/master/salary-info')}
            variant="outlined"
            fullWidth
            className={spacingClasses.marginTop1}
          >
            Salary Settings
          </Button> */}
          {/* <Button
            onClick={() => history.push('/master/otherdocuments')}
            variant="outlined"
            fullWidth
            className={spacingClasses.marginTop1}
          >
            {' '}
            Other Documents
          </Button> */}

          {/* <Button
            onClick={() => history.push('/master/work-information ')}
            variant="outlined"
            fullWidth
            className={spacingClasses.marginTop1}
          >
            {' '}
            Work Information
          </Button> */}

          {/*  ============= User Registration ================= */}

          <div hidden={Origin == 'EmployeeProfile' || hasAccount == 'true' ? true : false}>
            {(OriginList === 'Archived Employees' ||
              (location.pathname.indexOf('/archived-employees/') >= 0 &&
                userAccess.master.archivedEmployees.userRegistration.grantAccess) ||
              OriginList === 'Employees' ||
              (location.pathname.indexOf('/employees/') >= 0 &&
                userAccess.master.employees.userRegistration.grantAccess) ||
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
              onClick={() => {
                navigateTo(`/master/educational-attainment`);
              }}
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
            (location.pathname.indexOf('/employees/') >= 0 &&
              userAccess.master.employees.familyAndDependents.dashboard) ||
            OriginList === 'Archived Employees' ||
            (location.pathname.indexOf('/archived-employees/') >= 0 &&
              userAccess.master.archivedEmployees.familyDependents.dashboard) ||
            OriginList === 'Employee Profile' ||
            (location.pathname === '/employees/profile' &&
              userAccess.employees.employeeProfile.familyAndDependants.dashboard)) && (
            <Button
              onClick={() => navigateTo(`/master/family-and-dependents`)}
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
              onClick={() => navigateTo(`/master/leave-settings`)}
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
              onClick={() => navigateTo(`/master/leave-records`)}
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
              onClick={() => navigateTo(`/master/salary-info`)}
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
              onClick={() => navigateTo(`/master/work-information`)}
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
              onClick={() => navigateTo(`/master/employee-daily-task`)}
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
            onClick={() => navigateTo(`/master/user-access`)}
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
        </BodyDialog>
        <FooterDialog> {/* <ButtonComponent fullWidth={true} color="primary" text={'Show Results'} /> */}</FooterDialog>
      </Dialog>
    </div>
  );
};

export default ActionMenuMobileComponent;
