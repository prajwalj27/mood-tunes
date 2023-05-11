import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (method, endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: method,
    url: `http://localhost:8000/${endpoint}`,
    params: { ...query },
  };

  const getRecommendedSongs = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      console.log(response);
      setData(response.data.data)
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedSongs();
  }, []);


  return { data, isLoading, error};
};

export default useFetch;