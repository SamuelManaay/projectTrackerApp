// Yup
const yup = require('yup');

export const signinSchema = yup.object().shape({
  useraccess: yup.string().required('Enter your email address'),
  password: yup.string().required('Enter your password'),
});
