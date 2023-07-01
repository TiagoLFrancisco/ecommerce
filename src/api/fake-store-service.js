import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async () => {
    const { data } = await axios.get(`${BASE_URL}/products`);
    return data;
};
