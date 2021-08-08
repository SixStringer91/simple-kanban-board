export const timeHandler = (ms) => {
  const isoDate = new Date(ms).toISOString();
  return isoDate.substr(0, 10);
};
