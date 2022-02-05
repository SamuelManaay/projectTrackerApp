// Yup
const yup = require('yup');

export const changePasswordSchema = yup.object().shape({
  OldPassword: yup.string().required('Enter your old password'),
  NewPassword: yup.string().min(8, 'Password must contain at least 8 characters').required('Enter your password'),
  ConfirmNewPassword: yup
    .string()
    .required('Enter confirm password')
    .when('NewPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('NewPassword')], 'Password do not match'),
    }),
});
