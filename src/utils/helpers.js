export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, property) => {
  let unique = data.map((item) => item[property]);
  if (property === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};
