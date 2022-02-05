/**
 * @param integer number: number to be formatted
 * @param integer length: length of decimal
 * @param integer lengthWhole: length of whole number to be seperated
 * @param string   sectionDelimiter: section delimiter string
 * @param string   decimalDelimeter: decimal delimiter string
 */

export function formatNumber(number, length, lengthWhole, sectionDelimiter, decimalDelimeter) {
  var re = '\\d(?=(\\d{' + (lengthWhole || 3) + '})+' + (length > 0 ? '\\D' : '$') + ')',
    num = number.toFixed(Math.max(0, ~~length));

  return (decimalDelimeter ? num.replace('.', decimalDelimeter) : num).replace(
    new RegExp(re, 'g'),
    '$&' + (sectionDelimiter || ',')
  );
}

/* 
  ? format(123456789);                   === "123,456,789"
  ? format(123456789, 2);                === "123,456,789.00"
  ? format(12345678.9, 2, 4);            === "1234,5678.90"
  ? format(12345678.9, 0, 3, '-');       === "123-456-789"
  ? format(12345678.9, 2, 3, '.', ',');  === "12.345.678,90"
  ? format(12345678.9, 4, 4, ' ', ':');  === "1234 5678:9000"
*/
