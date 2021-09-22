const appendLeadingZeroes = (n: number) => {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
};

export const dateToString = (date: Date, includeTime = true) => {
  if (includeTime) {
    return (
      appendLeadingZeroes(date.getDate()) +
      "." +
      appendLeadingZeroes(date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      appendLeadingZeroes(date.getHours()) +
      ":" +
      appendLeadingZeroes(date.getMinutes()) +
      ":" +
      appendLeadingZeroes(date.getSeconds())
    );
  } else {
    return (
      appendLeadingZeroes(date.getDate()) +
      "." +
      appendLeadingZeroes(date.getMonth() + 1) +
      "." +
      date.getFullYear()
    );
  }
};
