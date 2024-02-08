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

export const updateTopping = (toppingId, newToppingData) => {
  return fetch(`/api/toppings/${toppingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToppingData),
  });
};

export const deleteTopping = (toppingId) => {
  return fetch(`api/toppings/${toppingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getAllPizzas = () => {
  return fetch('/api/pizzas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPizza = (pizzaData) => {
  return fetch('api/pizzas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });
};

export const updatePizza = (pizzaId, newPizzaData) => {
  return fetch(`api/pizzas/${pizzaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPizzaData),

  });
};

export const deletePizza = (pizzaId) => {
  return fetch(`api/pizzas/${pizzaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};