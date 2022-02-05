const yup = require('yup');

export const addUserGroupsSchema = yup.object().shape({
    Description: yup.string().required("Enter Description"),
    isActive: yup.boolean(),
    isComboDefault: yup.boolean(),
});