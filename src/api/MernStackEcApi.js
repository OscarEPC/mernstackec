import axios from 'axios';

import { getEnvVariables } from '../ui/helpers';

const { VITE_API_URL } = getEnvVariables();

export const mernStackEcApi = axios.create({
    baseURL: VITE_API_URL
});