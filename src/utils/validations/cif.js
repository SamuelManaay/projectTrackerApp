import * as yup from 'yup';

export const cifSchema = yup.object({
  // Travel History
  THHasBeenCountry: yup
    .string()
    .required('Please tell us if you have history of travel/visit/work in other countries with the last 14 days'),
  THPortOfExit: yup.string().when('THHasBeenCountry', {
    is: '1',
    then: yup.string().required('Please enter your port (country) of exit'),
  }),
  THVessel: yup.string().when('THHasBeenCountry', {
    is: '1',
    then: yup.string().required('Please enter your airline/sea vessel'),
  }),
  THVesselNumber: yup.string().when('THHasBeenCountry', {
    is: '1',
    then: yup.string().required('Please enter your flight/vessel number'),
  }),
  THDateDeparture: yup.string().when('THHasBeenCountry', {
    is: '1',
    then: yup.string().required('Please enter your date of departure'),
  }),
  THDateArrivalPhilippines: yup.string().when('THHasBeenCountry', {
    is: '1',
    then: yup.string().required('Please enter your date of arrival in the Philippines'),
  }),

  // Address Outside the Philippines
  AOPEmployeerName: yup.string().nullable(),
  AOPOccupation: yup.string().nullable(),
  AOPPlaceOfWork: yup.string().nullable(),
  AOPHouseNo: yup.string().nullable(),
  AOPStreet: yup.string().nullable(),
  AOPCity: yup.string().nullable(),
  AOPProvince: yup.string().nullable(),
  AOPCountry: yup.string().nullable(),
  AOPOfficePhoneNo: yup.string().nullable(),
  AOPOfficeCellphoneNo: yup.string().nullable(),

  // Exposure History
  EHHistoryExposure: yup
    .string()
    .required(
      'Please tell us if you have history of exposure to known COVID-19 case 14 days before the onset of signs and symptoms'
    ),
  EHDateContactExposure: yup.string().when('EHHistoryExposure', {
    is: '1',
    then: yup.string().required('Please enter date of contact with known COVID-19 case'),
  }),
  EHhasBeenPlaceTransmission: yup.string().when('EHHistoryExposure', {
    is: '1',
    then: yup
      .string()
      .required(
        'Please tell us if you have been to a place with known COVID-19 transmission 14 days before the onset of signs and symptoms'
      ),
  }),
  EHisWorkPlace: yup.boolean().nullable(),
  EHisSocialGathering: yup.boolean().nullable(),
  EHisHealthFacility: yup.boolean().nullable(),
  EHisReligiousGathering: yup.boolean().nullable(),
  EHisOtherPlace: yup.boolean().nullable(),
  EHOtherPlaceType: yup.string().when('isOtherPlace', {
    is: true,
    then: yup.string().required('Please specify type'),
  }),
  EHDateInPlace: yup.string().when('EHhasBeenPlaceTransmission', {
    is: '1',
    then: yup
      .string()
      .required(
        'Please enter the date of when you have been to a place with known COVID-19 transmission 14 days before the onset of signs and symptoms'
      ),
  }),
  EHNameOfPlace: yup.string().when('EHhasBeenPlaceTransmission', {
    is: '1',
    then: yup.string().required('Please enter the name of the place'),
  }),

  // Clinical Information
  CIClinicalStatus: yup.string().required('Please choose your clinical status at the time of report'),
  CIFever: yup.string().required('Please tell us your current body temperature'),
  CIIsFeelingUnwellThisTime: yup.boolean().nullable(),
  CIDateofOnsetIllness: yup.string().when('CIClinicalStatus', {
    is: (val) => ['Inpatient', 'Outpatient', 'Discharged', 'Died'].includes(val),
    then: yup.string().required('Please enter the date of your onset of illness'),
  }),
  CIDateAdmission: yup.string().when('CIClinicalStatus', {
    is: (val) => ['Inpatient', 'Outpatient', 'Discharged', 'Died'].includes(val),
    then: yup.string().required('Please enter the date of your admission/consultation'),
  }),

  CIhasCough: yup.boolean().nullable(),
  CIhasSorethroat: yup.boolean().nullable(),
  CIhasColds: yup.boolean().nullable(),
  CIhasShortnessBreathing: yup.boolean().nullable(),

  CIOtherSymptoms: yup.string().nullable(),

  CIHistoryOtherIllness: yup.string().required('Please tell us if you have other history of illness or not'),
  CIhasDiabetes: yup.boolean().nullable(),
  CIhasHypertension: yup.boolean().nullable(),
  CIhasChronicRenalDisease: yup.boolean().nullable(),
  CIhasOthers: yup.boolean().nullable(),
  CIOtherIllness: yup
    .string()
    .trim()
    .when('CIhasOthers', {
      is: (CIhasOthers) => CIhasOthers === true,
      then: yup
        .string()
        .required('Please enter your other history of illness')
        .typeError('Please enter your other history of illness'),
    }),

  CIhasChestXRay: yup.string().required('Please tell us if you are done with your chest x-ray or not'),
  CIDateChecstXRay: yup.string().when('CIhasChestXRay', {
    is: '1',
    then: yup.string().required('Please tell us the date of your chest x-ray'),
  }),

  CICXRResult: yup.string().required('Please choose CXR Result'),

  CIOtherRadiologicFindings: yup.string().nullable(),

  CILMP: yup.string().nullable(),
  CIisPregnant: yup.string().nullable(),
  CIisHighRisk: yup.string().when('CIisPregnant', {
    is: '1',
    then: yup.string().required("Please tell us if you're assessed pregnancy is high risk or not"),
  }),
});
