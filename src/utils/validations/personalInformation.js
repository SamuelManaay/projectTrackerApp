// Yup
const yup = require('yup');

export const personalInformationSchema = yup.object().shape({
  // Basic Information
  LastName: yup.string().required('Enter your last name'),
  FirstName: yup.string().required('Enter your first name'),
  MiddleName: yup.string().nullable(),
  Suffix: yup.string().nullable(),
  Gender: yup.string().required('Select your gender'),
  CivilStatus: yup.string().required('Select your civil status'),
  Birthdate: yup.string().required('Enter your birthdate'),
  Birthplace: yup.string().required('Enter your birthplace'),
  Nationality: yup.string().required('Enter your nationality'),
  Religion: yup.string().nullable(),
  Occupation: yup.string().nullable(),
  BloodType: yup.string().required('Enter your blood type'),

  // Contact Information
  MobileNo: yup.string().required('Enter your mobile no.'),
  TelephoneNo: yup.string().nullable(),
  EmailAddress1: yup.string().email('Enter a valid email address').required('Enter your email address 1'),
  EmailAddress2: yup.string().email('Enter a valid email address').nullable(),

  // Current Address
  HouseNo: yup.string().nullable(),
  CurrentStreetAddress: yup.string().required('Enter your current street address'),
  CurrentBarangay: yup.string().required('Select your current barangay in the search address button'),
  CurrentCityMunicipality: yup.string().required('Select your current city in the search address button'),
  CurrentProvince: yup.string().required('Select your current province in the search address button'),
  Region: yup.string().nullable(),

  // Permanent Address
  PermanentHouseNo: yup.string().required('Enter your permanent house no.'),
  PermanentStreetAddress: yup.string().required('Enter your permanent street address'),
  PermanentBarangay: yup.string().required('Select your barangay in the search address button'),
  PermanentCityMunicipality: yup.string().required('Select your permanent city in the search address button'),
  PermanentProvince: yup.string().required('Select your permanent province in the search address button'),
  PermanentRegion: yup.string().nullable(),

  // Other Details
  PhilhealthNumber: yup
    .string()
    .test('len', 'Invalid Philhealth No.', (val = '') => {
      const val_length_without_dashes = val.replace(/-|_/g, '').length;
      return val_length_without_dashes === 12;
    })
    .required('Enter your philhealth no.'),
  PassportNo: yup.string().nullable(),
});
