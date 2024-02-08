import { useState, useEffect } from 'react';
import { getAllToppings, createTopping } from '../utils/api';

export default function HomePage() {
  // Set State variables to set and retrieve data
  const [toppingsList, setToppings] = useState([]);
  const [newToppingName, setNewToppingName] = useState('');

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

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Toppings</h5>
          <ul className='list-group'>
            {toppingsList.map((toppings) => (
              <li
                key={toppings.id}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                {toppings.name}
                <div>
                  <button type='button' className='btn btn-primary me-2'>
                    Edit
                  </button>
                  <button type='button' className='btn btn-danger'>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type='text'
            value={newToppingName}
            onChange={(e) => setNewToppingName(e.target.value)}
            placeholder='Enter new topping name'
          />
          <button onClick={handleCreateTopping}>Add Topping</button>
        </div>
      </div>
    </div>
  );
}
