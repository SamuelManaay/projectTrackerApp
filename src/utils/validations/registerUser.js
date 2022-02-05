// Yup
const yup = require('yup');

export const registerUserSchema = yup.object().shape({
  UserAccess: yup.string().required('Enter User Access'),
  UserPassword: yup.string().required('Enter Password'),
  UserGroupID: yup.string().required('Select User Group'),
});
