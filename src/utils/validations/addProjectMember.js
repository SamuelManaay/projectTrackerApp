// Yup
const yup = require('yup');

export const addProjectMemberSchema = yup.object().shape({
  CompleteName: yup
    .object()
    .shape({
      DatacenterID: yup.number(),
      CompleteName: yup.string(),
    })
    .nullable()
    .required('Select member'),
  ProjectRole: yup
    .object()
    .shape({
      ProjectRoleID: yup.number(),
      Description: yup.string(),
    })
    .nullable()
    .required('Select role'),
  CostAmount: yup.number().required('Enter cost'),
});
