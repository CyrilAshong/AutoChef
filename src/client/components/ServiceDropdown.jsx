import React, { useState, useEffect } from 'react';

function ServiceDropdown({ formData, handleInputChange }) {
  // State to store service names fetched from the API
  const [serviceNames, setServiceNames] = useState([]);

  // Fetch the services data when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/services')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extract the service names and update the state
        setServiceNames(data.map(service => service.name));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <select
      name="service"
      value={formData.service}
      onChange={handleInputChange}
      className="appearance-none border border-gray-300 bg-gray-50 rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="service"
      required
    >
      <option value="">--Select Service--</option>
      {serviceNames.map((serviceName, index) => (
        <option key={index} value={serviceName}>
          {serviceName}
        </option>
      ))}
    </select>
  );
}

export default ServiceDropdown;