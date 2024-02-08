import { useState, useEffect } from 'react';
import deleteIcon from '../src/assets/trash-solid.svg'
import editIcon from '../src/assets/pen-to-square-solid.svg'
import {
  getAllToppings,
  createTopping,
  getAllPizzas,
  updateTopping,
  deleteTopping,
  createPizza,
  updatePizza,
  deletePizza,
} from '../utils/api';

export default function HomePage() {
  // Set State variables to set and retrieve data
  const [toppingsList, setToppings] = useState([]);
  const [newToppingName, setNewToppingName] = useState('');
  const [pizzasList, setPizzas] = useState([]);
  const [editedToppingName, setEditedToppingName] = useState('');
  const [editingToppingId, setEditingToppingId] = useState(null);
  const [pizzaName, setPizzaName] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [editedPizzaName, setEditedPizzaName] = useState('');
  const [editingPizzaId, setEditingPizzaId] = useState(null);

  // calling getAllToppings fetch request
  useEffect(() => {
    const getToppings = async () => {
      try {
        const res = await getAllToppings();
        if (!res.ok) {
          throw new Error('No toppings available');
        }
        const toppingsList = await res.json();
        setToppings(toppingsList);
      } catch (error) {
        console.error(error);
      }
    };
    getToppings();
  }, []);

  // Function to handle creation of new topping
  const handleCreateTopping = async () => {
    try {
      const existingTopping = toppingsList.find(
        (topping) => topping.name === newToppingName
      );
      if (existingTopping) {
        alert(`Topping "${newToppingName}" already exists!`);
        return; // Exit function if topping already exists
      }
      const res = await createTopping({ name: newToppingName }); // Send the new topping name to the API
      if (!res.ok) {
        throw new Error('Failed to create topping');
      }
      const createdTopping = await res.json();
      setToppings([...toppingsList, createdTopping]); // Update the toppings list with the newly created topping
      setNewToppingName(''); // Clear the input field after successful creation
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle editing of a topping name
  const handleEditTopping = (toppingId, currentName) => {
    setEditingToppingId(toppingId);
    setEditedToppingName(currentName);
  };

  // Function to save edited topping name
  const handleSaveTopping = async (toppingId, updatedName) => {
    try {
      const res = await updateTopping(toppingId, { name: updatedName });
      if (!res.ok) {
        throw new Error('Failed to update topping');
      }
      const updatedTopping = await res.json();
      const updatedToppings = toppingsList.map((topping) => {
        if (topping._id === updatedTopping._id) {
          return updatedTopping;
        }
        return topping;
      });
      setToppings(updatedToppings);
      setEditingToppingId(null); // Clear editing state after successful update
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deletion of a topping
  const handleDeleteTopping = async (toppingId) => {
    try {
      const res = await deleteTopping(toppingId);
      if (!res.ok) {
        throw new Error('Failed to delete topping');
      }
      const updatedToppings = toppingsList.filter(
        (topping) => topping._id !== toppingId
      );
      setToppings(updatedToppings);
    } catch (error) {
      console.error(error);
    }
  };

  // Calling getAllPizzas fetch request
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await getAllPizzas();
        if (!res.ok) {
          throw new Error('No pizzas available');
        }
        const pizzasList = await res.json();
        console.log(pizzasList);
        setPizzas(pizzasList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPizzas();
  }, []);

  // Function to get toppings names based on IDs
  const getToppingNames = (toppingIds) => {
    return toppingIds.map((toppingId) => {
      const topping = toppingsList.find((topping) => topping._id === toppingId);
      return topping ? topping.name : 'Unknown Topping';
    });
  };

  const handleCreatePizza = async (e) => {
    e.preventDefault();
    try {
      const existingPizza = pizzasList.find(
        (pizza) => pizza.name === pizzaName
      );
      if (existingPizza) {
        alert(`Pizza "${pizzaName}" already exists!`);
        return; // Exit function if pizza already exists
      }
      const res = await createPizza({
        name: pizzaName,
        toppings: selectedToppings,
      });
      if (!res.ok) {
        throw new Error('Failed to create pizza');
      }
      const createdPizza = await res.json();
      setPizzas([...pizzasList, createdPizza]);
      setPizzaName(''); // Clear the pizza name input field
      setSelectedToppings([]); // Clear the selected toppings
    } catch (error) {
      console.error(error);
    }
  };

  const handleToppingChange = (toppingId) => {
    setSelectedToppings((prevSelectedToppings) => {
      if (prevSelectedToppings.includes(toppingId)) {
        return prevSelectedToppings.filter((id) => id !== toppingId);
      } else {
        return [...prevSelectedToppings, toppingId];
      }
    });
  };

  const handleEditPizza = (pizzaId, currentName) => {
    setEditingPizzaId(pizzaId);
    setEditedPizzaName(currentName);
  };

  const handleSavePizza = async (pizzaId, updatedName, selectedToppings) => {
    try {
      const res = await updatePizza(pizzaId, {
        name: updatedName,
        toppings: selectedToppings,
      });
      if (!res.ok) {
        throw new Error('Failed to update pizza');
      }
      const updatedPizza = await res.json();
      const updatedPizzas = pizzasList.map((pizza) => {
        if (pizza._id === updatedPizza._id) {
          return updatedPizza;
        }
        return pizza;
      });
      setPizzas(updatedPizzas);
      setEditingPizzaId(null);
      setSelectedToppings([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePizza = async (pizzaId) => {
    try {
      const res = await deletePizza(pizzaId);
      if (!res.ok) {
        throw new Error('Failed to delete pizza');
      }
      const updatedPizzas = pizzasList.filter((pizza) => pizza._id !== pizzaId);
      setPizzas(updatedPizzas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='page-title'>Pizza Parlor</h1>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card toppings-card'>
            <div className='card-body'>
              <h5 className='card-title'>Manage Toppings</h5>
              <ul className='list-group'>
                {toppingsList.map((topping) => (
                  <li
                    key={topping._id}
                    className='list-group-item d-flex justify-content-between align-items-center'
                  >
                    {editingToppingId === topping._id ? (
                      <>
                        <input
                          type='text'
                          value={editedToppingName}
                          onChange={(e) => setEditedToppingName(e.target.value)}
                          placeholder='Enter new topping name'
                        />
                        <button
                          type='button'
                          className='btn btn-success ms-2'
                          onClick={() =>
                            handleSaveTopping(topping._id, editedToppingName)
                          }
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        {topping.name}
                        <div>
                        <img
                            src={editIcon}
                            alt='Edit'
                            className='ms-2 delete-btn-img'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditTopping(topping._id, topping.name)}
                          />
                          <img
                            src={deleteIcon}
                            alt='Delete'
                            className='ms-2 delete-btn-img'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteTopping(topping._id)}
                          />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <input className='topping-input'
                type='text'
                value={newToppingName}
                onChange={(e) => setNewToppingName(e.target.value)}
                placeholder='Enter new topping name'
              />
              <button className='add-topping-btn btn btn-success' onClick={handleCreateTopping}>Add Topping</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card pizzas-card'>
            <div className='card-body'>
              <h5 className='card-title'>Manage Pizzas</h5>
              <ul className='list-group'>
                {pizzasList.map((pizza) => (
                  <li
                    key={pizza._id}
                    className='list-group-item d-flex justify-content-between align-items-center'
                  >
                    <div>
                      {editingPizzaId === pizza._id ? (
                        <>
                          <input
                            type='text'
                            value={editedPizzaName}
                            onChange={(e) => setEditedPizzaName(e.target.value)}
                            placeholder='Enter new pizza name'
                          />
                          <div className='mb-3'>
                            <label className='form-label'>Toppings:</label>
                            {toppingsList.map((topping) => (
                              <div key={topping._id} className='form-check'>
                                <input
                                  className='form-check-input'
                                  type='checkbox'
                                  id={topping._id}
                                  value={topping._id}
                                  checked={selectedToppings.includes(
                                    topping._id
                                  )}
                                  onChange={(e) =>
                                    handleToppingChange(e.target.value)
                                  }
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor={topping._id}
                                >
                                  {topping.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          <button
                            type='button'
                            className='btn btn-success ms-2'
                            onClick={() =>
                              handleSavePizza(
                                pizza._id,
                                editedPizzaName,
                                selectedToppings
                              )
                            }
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {pizza.name}
                          <div>
                            <strong className='toppings-head'>Toppings:</strong>{' '}
                            {getToppingNames(pizza.toppings).join(', ')}
                          </div>
                          <div>
                          <img
                            src={editIcon}
                            alt='Edit'
                            className='ms-2 delete-btn-img'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditPizza(pizza._id, pizza.name)}
                          />
                            <img
                            src={deleteIcon}
                            alt='Delete'
                            className='ms-2 delete-btn-img'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeletePizza(pizza._id)}
                          />
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card create-pizza-card'>
            <div className='card-body'>
              <h5 className='card-title'>Create New Pizza</h5>
              <form onSubmit={handleCreatePizza}>
                <div className='mb-3'>
                  <label htmlFor='pizzaName' className='form-label'>
                    Pizza Name:
                  </label>
                  <input
                    type='text'
                    id='pizzaName'
                    value={pizzaName}
                    onChange={(e) => setPizzaName(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3 create-pizza'>
                  <label className='form-label'>Toppings:</label>
                  {toppingsList.map((topping) => (
                    <div key={topping._id} className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id={topping._id}
                        value={topping._id}
                        checked={selectedToppings.includes(topping._id)}
                        onChange={(e) => handleToppingChange(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor={topping._id}>
                        {topping.name}
                      </label>
                    </div>
                  ))}
                </div>

                <button type='submit' className='btn btn-success'>
                  Create Pizza
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
