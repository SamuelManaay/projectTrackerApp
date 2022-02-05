export function formatNumberComma(value) {
  return value.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
}
