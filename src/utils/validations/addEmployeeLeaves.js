// Yup
const yup = require('yup');

export const addEmployeeLeaves = yup.object().shape({
    SubDeptID: yup.string().required('Select Department'),
    // DatacenterLeaveSettingID: yup.string().required('Select Leave Category'),
    ReasonForLeave: yup.string().required('Enter Reason for Leave'),
    DateOfLeave: yup.string().required('Enter Date of Leave'),
    TypeOfLeave: yup.string().required('Select Type of Leave'),
    AddressDuringLeave: yup.string().required('Enter Address during Leave'),
    PhoneNumber: yup.string().required('Enter Phone Number'),
    OtherNotes: yup.string().nullable(),
});
