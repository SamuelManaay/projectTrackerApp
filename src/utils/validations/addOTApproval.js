// Yup
const yup = require('yup');

export const addOTApproval = yup.object().shape({
  Remarks: yup.string().required('Enter Remarks'),
});
