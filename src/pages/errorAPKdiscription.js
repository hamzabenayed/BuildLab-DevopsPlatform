import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateErrorRelease() {
  const [descriptionER, setDescriptionER] = useState('');
  const [newDescriptionER, setNewDescriptionER] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleInputChange = (event) => {
    setNewDescriptionER(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/release/${id}/description`, { descriptionER: newDescriptionER });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      setDescriptionER(newDescriptionER);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Error Release</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={newDescriptionER} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={isLoading}>Update</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default UpdateErrorRelease;
