import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '40850281-d34ea881c994bc1ff48fafec7';

export const searchImages = async (query, page) => {
  try {
    const response = await axios.get(ENDPOINT, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 40,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
