export const openPDF = (pdf, id) => {
  let d = new Date();
  let datestring =
    ('0' + d.getDate()).slice(-2) +
    +('0' + (d.getMonth() + 1)).slice(-2) +
    +d.getFullYear() +
    ('0' + d.getHours()).slice(-2) +
    ('0' + d.getMinutes()).slice(-2) +
    ('0' + d.getSeconds()).slice(-2);

  let pdfWindow = window.open('');
  pdfWindow.document.write(
    '<html<head><title>' +
      '[' +
      id +
      ']' +
      datestring +
      '</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>'
  );
  pdfWindow.document.write(
    "<body><embed width='100%' height='100%' src='data:application/pdf;base64, " +
      encodeURI(pdf) +
      "#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>"
  );
};
