import axios, { Axios } from 'axios';

export const client: Axios = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      'Content-Type': 'application/json',
    }
  })
