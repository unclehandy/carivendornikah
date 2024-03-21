export function stringToDate(date) {
  const parts = date.split("-"); // Split the date string into parts
  const year = parseInt(parts[0]); // Extract year
  const monthIndex = parseInt(parts[1]) - 1; // Extract month (subtract 1 as months are zero-based)
  const day = parseInt(parts[2]); // Extract day

  const tanggal = new Date(year, monthIndex, day);

  return tanggal;
}
