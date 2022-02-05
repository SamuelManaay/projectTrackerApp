// Yup
const yup = require('yup');

export const addEducationalAttainmentschema = yup.object().shape({
  	EducationAttainment: yup.string().required("Please add Educational Attainment."),
  	SchoolName: yup.string().required("Please add School Attended"),
	YearGraduated: yup.date().required("Please add Year Graduated."),
	EducationalDegree: yup.string().required("Please add Educational Degree."),
  	DegreeType : yup.string().required("Please add Degree Type.")
});
