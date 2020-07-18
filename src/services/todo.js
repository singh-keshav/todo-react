import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000";

class TodoService {
  getAll() {
    return axios.get(`${API_URL}/todos`, { headers: authHeader() });
  }

  create(todo) {
    return axios.post(`${API_URL}/todos`, todo, {
      headers: authHeader()
    });
  }

  get(id) {
    return axios.get(`${API_URL}/todos/${id}`, {
      headers: authHeader()
    });
  }

  edit(id, todo) {
    return axios.put(`${API_URL}/todos/${id}`, todo, {
      headers: authHeader()
    });
  }
  delete(id){
    return axios.delete(`${API_URL}/todos/${id}`, {
      headers: authHeader()
    });
  }
}

export default new TodoService();
