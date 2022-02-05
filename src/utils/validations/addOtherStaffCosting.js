// Yup
const yup = require('yup');

export const addOtherStaffSchema = yup.object().shape({
    Code: yup.string().required('Enter code'),
    Category: yup.string().required('Enter category'),
    Description: yup.string().required('Enter description'),
    Rate: yup.string().required('Enter rate'),
    FTE: yup.string().required('Enter no. of FTE'),
    NoDays: yup.string().required('Enter no. of days'),
    Amount: yup.string().required('Enter amount'),
});
