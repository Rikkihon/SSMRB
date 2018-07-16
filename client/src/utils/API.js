import axios from "axios";

const API = {
  getSavedUsers: function () {
    return axios.get("/api/users");
  },
  saveUser: function(userData) {
    return axios.post('/api/users', userData);
  },
  deleteUser: function(id) {
    return axios.delete('/api/users/' + id);
  },
  getImages: function() {
    return axios.get("/images");
  },
  saveImages: function(userImage) {
    return axios.post('/images/upload', userImage);
  }
};

export default API;