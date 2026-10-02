export function validateBounds(minimumInput, maximumInput) {
  if (minimumInput.trim() === "" || maximumInput.trim() === "") {
    return "Enter both a minimum and a maximum.";
  }
  const minimum = Number(minimumInput);
  const maximum = Number(maximumInput);
  if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum)) {
    return "Enter whole numbers within the supported range.";
  }
  if (minimum > maximum) {
    return "The minimum must be less than or equal to the maximum.";
  }
  const rangeSize = maximum - minimum + 1;
  if (!Number.isSafeInteger(rangeSize)) {
    return "Choose bounds closer together.";
  }
  return "";
}

export function generateRandomInteger(minimum, maximum) {
  const rangeSize = maximum - minimum + 1;
  return minimum + Math.floor(Math.random() * rangeSize);
}
