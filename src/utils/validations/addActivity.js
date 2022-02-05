// Yup
const yup = require('yup');

export const addActivitySchema = yup.object().shape({
  Description: yup.string().required('Enter Description'),
  ManpowerHours: yup.string().required('Enter Manpower Hours'),
  isBillable: yup.string().required('Select Charge Type'),
  isComboDefault: yup.boolean(),
  isActive: yup.boolean()
});
