export function formatDate(date) {
  date = new Date(date);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate.replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3');
}
