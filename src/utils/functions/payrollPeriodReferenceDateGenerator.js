export function payrollPeriodReferenceDateGenerator(month, startDay, endDay) {
  var originMonth = new Date(month);
  var dateFrom = new Date(originMonth.getMonth() + 1 + '/' + startDay + '/' + originMonth.getFullYear());
  var dateTo;
  var totalMonth = originMonth.getMonth() + 1;
  if (startDay > endDay) {
    dateTo = new Date(
      (totalMonth > 11 ? totalMonth - 11 : totalMonth + 1) +
        '/' +
        endDay +
        '/' +
        (totalMonth > 11 ? originMonth.getFullYear() + 1 : originMonth.getFullYear())
    );
  } else {
    dateTo = new Date(originMonth.getMonth() + 1 + '/' + endDay + '/' + originMonth.getFullYear());
  }
  return {
    'dateFrom': dateFrom,
    'dateTo': dateTo,
  };
}
