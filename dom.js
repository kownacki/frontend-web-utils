export const isElementVisible = (element) => {
  const rect = element.getBoundingClientRect();
  return !(rect.top >= window.innerHeight) && !(rect.bottom <= 0);
};
