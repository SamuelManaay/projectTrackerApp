const yup = require('yup');

export const addProjectRoleSchema = yup.object().shape({
    Description: yup.string().required('Enter description'),
    CostAmount: yup.number().required('Enter Cost Amount. Value must be in decimal'),
    isActive: yup.boolean()
});