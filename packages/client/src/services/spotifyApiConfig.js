import axios from 'axios';

export const spotify = axios.create({
    baseURL: 'http://localhost:4001/',
});