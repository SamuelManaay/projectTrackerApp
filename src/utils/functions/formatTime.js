export function formatTime(str) {
  const date = new Date(str);
  const hours = date.getHours(); // previously getUTCHours

  let twoDigits = (no) => {
    const str = no.toString();
    return str.length === 1 ? '0' + str : str;
  };

  if (12 <= hours) {
    return (
      twoDigits(hours === 12 ? 12 : hours - 12) +
      ':' +
      twoDigits(date.getUTCMinutes()) +
      ':' +
      twoDigits(date.getUTCSeconds()) +
      ' PM'
    );
  } else {
    return twoDigits(hours) + ':' + twoDigits(date.getUTCMinutes()) + ':' + twoDigits(date.getUTCSeconds()) + ' AM';
  }
}
