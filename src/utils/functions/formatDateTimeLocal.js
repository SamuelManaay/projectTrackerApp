export function formatDateTimeLocal(str, includeDate) {
    const date = new Date(str);
    const hours = date.getHours();


    let d = new Date(str),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;




  
    let twoDigits = (no) => {
      const str = no.toString();
      return str.length === 1 ? '0' + str : str;
    };
  
    let strdate = includeDate
      ? twoDigits(date.getUTCMonth() + 1) +
        '/' +
        twoDigits(date.getUTCDate()) +
        '/' +
        twoDigits(date.getUTCFullYear()) +
        ' '
      : '';
  
    if (12 <= hours) {
      return (
        [month, day, year].join('/') + ' ' +
        twoDigits(hours === 12 ? 12 : hours - 12) +
        ':' +
        twoDigits(date.getUTCMinutes()) +
        ':' +
        twoDigits(date.getUTCSeconds()) +
        ' PM'
      );
    } else {
      return (
        [month, day, year].join('/') + ' ' + twoDigits(hours) + ':' + twoDigits(date.getUTCMinutes()) + ':' + twoDigits(date.getUTCSeconds()) + ' AM'
      );
 
    }
  }
  