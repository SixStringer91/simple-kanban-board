export const timeHandler = (t) => {
  const isoDate = new Date(t).toISOString();
  return isoDate.substr(0, 10);
};
