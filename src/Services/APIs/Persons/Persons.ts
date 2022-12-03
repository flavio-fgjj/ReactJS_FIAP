import api from "../Common/api";

const getPersons = (prodID: string) => api.get("/persons/getPersons/" + prodID);
// const postPersons = () => api.post("api",data)

export default {
  getPersons,
};
