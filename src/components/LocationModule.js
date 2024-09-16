import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationModule = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', capacity: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');

        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to fetch locations');
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLocation.name || !newLocation.address || !newLocation.capacity) {
      setError('All fields are required');
      return;
    }
    try {
      setError(null); // Clear previous errors
      const response = await axios.post('http://localhost:5000/api/locations', newLocation);
      setLocations([...locations, response.data]);
      setNewLocation({ name: '', address: '', capacity: '' });
    } catch (error) {
      console.error('Error creating location:', error);
      setError('Failed to create location');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/locations/${id}`);
      setLocations(locations.filter((location) => location._id !== id));
    } catch (error) {
      console.error('Error deleting location:', error);
      setError('Failed to delete location');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Locations</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <input
              type="text"
              name="name"
              placeholder="Location name"
              value={newLocation.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newLocation.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={newLocation.capacity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Create New Location
        </button>
      </form>

      {locations.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Address</th>
              <th className="text-left p-2">Capacity</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location._id} className="border-b">
                <td className="p-2">{location.name}</td>
                <td className="p-2">{location.address}</td>
                <td className="p-2">{location.capacity}</td>
                <td className="p-2">
                  <button 
                    onClick={() => handleDelete(location._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No locations found</p>
      )}
    </div>
  );
};

export default LocationModule;
