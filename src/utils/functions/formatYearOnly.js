export function formatYearOnly(date) {
    let d = new Date(date),
      year = d.getFullYear();
    return year;
  }
  