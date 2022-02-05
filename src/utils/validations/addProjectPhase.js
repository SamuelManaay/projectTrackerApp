const yup = require('yup');

export const addProjectPhaseSchema = yup.object().shape({
    Description: yup.string().required('Enter description'),
    isActive: yup.boolean()
});