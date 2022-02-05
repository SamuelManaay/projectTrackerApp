const yup = require('yup');

export const addNewsSchema = yup.object().shape({
    Subject: yup.string().required('Enter subject'),
    NewsType: yup.string().required('Choose news type'),
    Details: yup.string().required('Enter details'),
    StartDateTime: yup.date(),
    isPosted: yup.boolean(),
    isActive: yup.boolean()
});