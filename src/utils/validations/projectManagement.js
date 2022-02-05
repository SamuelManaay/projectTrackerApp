// Yup
const yup = require('yup');

export const projectManagementSchema = yup.object().shape({
  // Required
  ProjectCode: yup.string().required('Enter Project Code'),
  ProjectName: yup.string().required('Enter Project Name'),
  ClientName: yup.string().required('Enter Client Name '),
  ProjectType: yup.string().required('Select Project Type'),
  ServiceLine: yup.string().required('Select Service Line'),
  ProjectDuration: yup.string().required('Enter ProjectDuration'),
  ProjectStatus: yup.string().required('Select Project Status'),

  //Not required
   Budget: yup.string().nullable(),
   TotalBilling: yup.string().nullable(),
   ProjectDescription: yup.string().nullable(),
   ProjectStartDate: yup.string().nullable(),
   ProjectEndDate:yup.string().nullable(),
   ProjectManagementToolLink:yup.string().nullable(),
   RepositoryLink: yup.string().nullable(),
   Remarks: yup.string().nullable(),
   ProjectManager: yup.string().nullable(),
 
 
});
