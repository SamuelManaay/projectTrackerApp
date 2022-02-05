// Yup
const yup = require('yup');

export const addDepartmentSchema = yup.object().shape({
  Description: yup.string().required('Enter description'),
  Abbreviation: yup.string().required('Enter abbreviation'),
  isComboDefault: yup.boolean(),
  isActive: yup.boolean()
});
