// Yup
const yup = require('yup');

export const addSalaryDeductionschema = yup.object().shape({
  Description: yup.string().required('Enter description'),
  isComboDefault: yup.boolean(),
  isFixed: yup.boolean(),
  isActive: yup.boolean()
});
