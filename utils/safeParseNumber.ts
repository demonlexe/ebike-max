export const safeParseNumber = (value: string | undefined) => {
  if (value === undefined) {
    return "";
  }
  // remove non-numeric characters
  const numericValue = value.toString().replace(/[^0-9.]/g, "");
  return numericValue;
};
