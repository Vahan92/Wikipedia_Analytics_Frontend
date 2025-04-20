export const dateConvert = (date) => {
  if (date.includes('-W')) {
    return;
  }
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${day}/${month}/${year}`;
};
