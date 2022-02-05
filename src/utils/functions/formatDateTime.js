// export function formatDateTime(str, includeDate) {
//   const date = new Date(str);
//   const hours = date.getHours();

//   let twoDigits = (no) => {
//     const str = no.toString();
//     return str.length === 1 ? '0' + str : str;
//   };

//   let strdate = includeDate
//     ? twoDigits(date.getUTCMonth() + 1) +
//       '/' +
//       twoDigits(date.getUTCDate()) +
//       '/' +
//       twoDigits(date.getUTCFullYear()) +
//       ' '
//     : '';

//   if (12 <= hours) {
//     return (
//       strdate +
//       twoDigits(hours === 12 ? 12 : hours - 12) +
//       ':' +
//       twoDigits(date.getUTCMinutes()) +
//       ':' +
//       twoDigits(date.getUTCSeconds()) +
//       ' PM'
//     );
//   } else {
//     return (
//       strdate + twoDigits(hours) + ':' + twoDigits(date.getUTCMinutes()) + ':' + twoDigits(date.getUTCSeconds()) + ' AM'
//     );
//   }
// }
export function formatDateTime(str, includeDate) {
  const date = new Date(str);
  const hours = date.getUTCHours();

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
      strdate +
      twoDigits(hours === 12 ? 12 : hours - 12) +
      ':' +
      twoDigits(date.getUTCMinutes()) +
      ':' +
      twoDigits(date.getUTCSeconds()) +
      ' PM'
    );
  } else {
    return (
      strdate + twoDigits(hours) + ':' + twoDigits(date.getUTCMinutes()) + ':' + twoDigits(date.getUTCSeconds()) + ' AM'
    );
  }
}
