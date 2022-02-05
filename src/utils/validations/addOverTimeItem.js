// Yup
const yup = require('yup');

export const addOverTimeItem = yup.object().shape({
    TicketNumber: yup.string().required('Enter TicketNumber'),
    // DatacenterLeaveSettingID: yup.string().required('Select Leave Category'),
    TicketLink: yup.string().required('Enter TicketLink'),
    TaskDone: yup.string().required('Enter Task Done/Remarks'),
});
