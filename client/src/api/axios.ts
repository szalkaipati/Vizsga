import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Function to set token
export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// If you have a token in localStorage on page load, set it
const token = localStorage.getItem("token");
if (token) setAuthToken(token);

export default api;
