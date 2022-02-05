const yup = require('yup');

export const addProjectManagementProjectBillingSchema = yup.object().shape({
    BillingDate: yup.date().required("Choose Date"),
    BilledBy: yup.string().required("Enter Biller"),
    DocumentNo: yup.string().required("Enter Document No"),
    Description: yup.string().required("Enter Description"),
    Remarks: yup.string(),
    Amount: yup.number().required("Enter Amount"),
    isActive: yup.boolean(),
});