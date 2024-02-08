export const getAllToppings = () => {
  return fetch('/api/toppings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createTopping = (toppingData) => {
  return fetch('/api/toppings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toppingData),
  });
};
