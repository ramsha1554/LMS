import axios from "axios";

import { SERVER_URL } from "./constants";

// Centralized Axios client for cookie-based auth.
// - Always sends cookies (withCredentials)
// - Uses a consistent server base URL
const axiosClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default axiosClient;
