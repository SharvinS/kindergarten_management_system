import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/kms/";

class UserService {
  
  getPublicContent() {
    return axios.get(API_URL + "all", {
      headers: authHeader(),
    });
  }

  getUserBoard(userId) {
    return axios.get(API_URL + "user/" + userId, {
      headers: authHeader(),
    });
  }

  updateUser(userId, user) {
    return axios.put(API_URL + "user-update/" + userId, user, {
      headers: authHeader(),
    });
  }

  getPrincipalBoard() {
    return axios.get(API_URL + "principal/student-list/", { headers: authHeader() });
  }

  createUser(user) {
    return axios.post(API_URL + "principal/add-user/", user, {
      headers: authHeader(),
    });
  }

  getUserById(userId) {
    return axios.get(API_URL + "principal/view-user/" + userId, {
      headers: authHeader(),
    });
  }

  updateStudent(userId, user) {
    return axios.put(API_URL + "principal/update-student/" + userId, user, {
      headers: authHeader(),
    });
  }

  // soft delete
  removeUser(userId, user) {
    return axios.put(API_URL + "principal/remove/" + userId,  user,{
      headers: authHeader(),
    });
  }

  getDeletedUser() {
    return axios.get(API_URL + "principal/view-deleted-user", {
      headers: authHeader(),
    });
  }

  restoreDeletedUser(userId, user) {
    return axios.put(API_URL + "principal/restore/" + userId, user, {
      headers: authHeader(),
    });
  }

  // hard delete
  deleteUser(userId) {
    return axios.delete(API_URL + "principal/delete/" + userId, {
      headers: authHeader(),
    });
  }

  forgotPassword(email) {
    let formData = new FormData();
    formData.append("email", email);
    return axios.post("http://localhost:8080/forgot_password", formData);
  }

  resetPassword(token, password) {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("password", password);
    return axios.post("http://localhost:8080/reset_password", formData);
  }

  checkPassword(email, oldPassword) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("oldPassword", oldPassword);
    return axios.post("http://localhost:8080/change_password/check", formData, {
      headers: authHeader(),
    });
  }

  changePassword(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post("http://localhost:8080/change_password", formData, {
      headers: authHeader(),
    });
  }
  
}

export default new UserService();
