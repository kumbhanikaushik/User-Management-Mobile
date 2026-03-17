import axios from "axios";

const API = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 10000,
});

export const getUsers = (page) => API.get(`/users?page=${page}`);

export const createUser = (data) => API.post("/users", data);

export const updateUser = (id, data) => API.put(`/users/${id}`, data);

export default API;