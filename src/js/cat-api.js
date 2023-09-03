import axios from 'axios';

const AUTH_TOKEN =
  'live_uzr2s5JwQY0jjS2CiKpSss9wKCPWlFtHMw8LcC5arG2qW8YwqJtvSA8Pccpz8BKT';
axios.defaults.headers.common['x-api-key'] = AUTH_TOKEN;

const API_CAT_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  try {
    return axios.get(`${API_CAT_URL}/breeds`).then(res => {
      return res.data;
    });
  } catch (error) {}
}

function fetchCatByBreed(breedId) {
  try {
    return axios
      .get(`${API_CAT_URL}/images/search?breed_ids=${breedId}`)
      .then(res => {
        return res.data;
      });
  } catch (error) {}
}

// export modules
export { fetchBreeds, fetchCatByBreed };
