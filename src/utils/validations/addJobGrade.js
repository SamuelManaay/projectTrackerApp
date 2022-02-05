// Yup
const yup = require('yup');

export const addJobGradeschema = yup.object().shape({
  Description: yup.string().required('Enter description'),
  SalaryAmountFrom: yup.string().required('Enter Salary Amount From'),
  SalaryAmountTo: yup.string().required('Enter Salary Amount To'),
  isComboDefault: yup.boolean(),
  isActive: yup.boolean()
});
