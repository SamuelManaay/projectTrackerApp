// Yup
const yup = require('yup');

export const addloghours = yup.object().shape({
    MyHours: yup.string().nullable(),
    MyMinutes: yup.string().nullable(),
    DateLogs: yup.string().required('Enter a valid Date'),
    Tickets: yup.string().nullable(),
    Remarks: yup.string().required('Enter Remarks')
});
