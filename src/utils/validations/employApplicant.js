// Yup
const yup = require('yup');

export const employApplicantSchema = yup.object().shape({

    Imagepath: yup.string().nullable(),
    DatacenterCode: yup.string().required('Enter Employee Code'),
    ApplicantNumber: yup.string().required('Enter Applicant Number'),
    HRNotes: yup.string().nullable(),

    // Basic Information
    Lastname: yup.string().required('Enter last name'),
    Firstname: yup.string().required('Enter first name'),
    Middlename: yup.string().required('Enter middle name'),
    Suffix: yup.string().nullable(),
    ExtensionName: yup.string().nullable(),
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
    CompanyEmail: yup.string().email('Enter a valid email address').required('Enter company email address'),

    // Current Address
    CurrentHouseNo: yup.string().required('Enter current street address'),
    CurrentStreet: yup.string().required('Enter current street address'),
    CurrentBarangay: yup.string().required('Select current barangay in the search address button'),
    CurrentCity: yup.string().required('Select current city in the search address button'),
    CurrentProvince: yup.string().required('Select current province in the search address button'),
    CurrentRegion: yup.string().required('Select current region in the search address button'),

    // Permanent Address
    PermanentHouseNo: yup.string().required('Enter permanent house no.'),
    PermanentStreet: yup.string().required('Enter permanent street address'),
    PermanentBarangay: yup.string().required('Select barangay in the search address button'),
    PermanentCity: yup.string().required('Select permanent city in the search address button'),
    PermanentProvince: yup.string().required('Select permanent province in the search address button'),
    PermanentRegion: yup.string().required('Select permanent region in the search address button'),

    //In Case Of Emergency
    EmergencyName: yup.string().required('Enter name.'),
    EmergencyRelationship: yup.string().required('Enter relationship.'),
    EmergencyMobileNo: yup.string().required('Enter mobile no.'),
    EmergencyAddress: yup.string().required('Enter address.'),

    EmergencyName2: yup.string().required('Enter name.'),
    EmergencyRelationship2: yup.string().required('Enter relationship.'),
    EmergencyMobileNo2: yup.string().required('Enter mobile no.'),
    EmergencyAddress2: yup.string().required('Enter address.'),

    // Other Details
    PhilhealthNo: yup
        .string()
        .test('len', 'Invalid PhilHealth No.', (val = '') => {
            const val_length_without_dashes = val.replace(/-|_/g, '').length;
            return val_length_without_dashes === 12;
        })
        .required('Enter philHealth no.'),
    SSSNo: yup.string().required('Enter SSS No.'),
    PagibigNo: yup.string().required('Enter Pag-IBIG No.'),
    TINNo: yup.string().required('Enter TIN No.'),
    NoOfDependent: yup.string().required('Enter No. of Dependent'),

});
