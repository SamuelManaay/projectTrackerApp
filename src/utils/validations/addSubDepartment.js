// Yup
const yup = require('yup');

export const addSubDepartmentSchema = yup.object().shape({
  DeptID: yup.string().required('Enter Department'),
  Description: yup.string().required('Enter SubDepartment'),
  Abbreviation: yup.string().required('Enter abbreviation'),
  isComboDefault: yup.boolean(),
  isActive: yup.boolean()
});
