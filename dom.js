export const isElementInProximity = (element, proximity = window.innerHeight) => {
  const rect = element.getBoundingClientRect();
  return !(rect.top >= window.innerHeight + proximity) && !(rect.bottom <= -proximity);
};

export const isElementVisible = (element) => {
  return isElementInProximity(element, 0);
};
