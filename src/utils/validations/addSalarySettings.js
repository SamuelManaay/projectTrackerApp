const yup = require('yup');

export const addSalarySettingsSchema = yup.object().shape({
    Description: yup.string().required('Enter description'),
    Category: yup.string().required('Choose a category'),
    Taxable: yup.boolean(),
    isActive: yup.boolean()
});