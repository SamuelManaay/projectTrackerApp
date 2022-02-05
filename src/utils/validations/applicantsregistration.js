// Yup
const yup = require('yup');

export const registrationApplicantSchema = yup.object().shape({
    Imagepath: yup.string().required('fwef'),

    // Basic Information
    ApplicantNumber: yup.string().required('Enter applicant number'),
    Lastname: yup.string().required('Enter last name'),
    Firstname: yup.string().required('Enter first name'),
    Middlename: yup.string().required('Enter middle name'),
    Suffix: yup.string().nullable(),
    Gender: yup.string().required('Select gender'),
    CivilStatus: yup.string().required('Select civil status'),
    Birthdate: yup.string().required('Enter birthdate'),
    Nationality: yup.string().required('Enter nationality'),
    Religion: yup.string().nullable(),
    BloodType: yup.string().required('Enter blood type'),

    // Contact Information
    MobileNo: yup.string().required('Enter mobile no.'),
    TelephoneNo: yup.string().required('Enter telephone no.'),
    PersonalEmail: yup.string().email('Enter a valid email address').required('Enter email address'),

    // Current Address
    CurrentHouseNo: yup.string().required('Enter current street address'),
    CurrentStreet: yup.string().required('Enter current street address'),
    CurrentBarangay: yup.string().required('Select current barangay in the search address button'),
    CurrentCity: yup.string().required('Select current city in the search address button'),
    CurrentProvince: yup.string().required('Select current province in the search address button'),
    CurrentRegion: yup.string().required('Select current region in the search address button'),


});
