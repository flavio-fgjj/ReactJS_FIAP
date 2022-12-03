import axios from "axios";

const apiConn = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default apiConn;
