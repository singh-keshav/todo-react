import axios from "axios";

const API_URL = "http://localhost:4000";

class AuthService {
  login(email, password) {
    return axios
      .post(`${API_URL}users/login`, {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("json saved in local storage");
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name, last_name, email, password) {
    return axios.post(`${API_URL}users/register`, {
      first_name,
      last_name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
