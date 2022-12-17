import axios from "axios";

export const UsersAPI = {
  register: (signUpData) => {
    return axios.post("/register", signUpData);
  },
  login: (loginData) => {
    return axios.post("/login", loginData);
  },
  getUsers: (token) => {
    return axios.get("/users", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  addAdmin: (userId, token) => {
    return axios.post(
      `/users/add-admin/${userId}`,
      {},
      {
        headers: {
          "X-Auth-Token": token,
        },
      }
    );
  },
};

export const ShoesAPI = {
  addShoe: (submitData, token) => {
    return axios.post("/shoes", submitData, {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  getShoeById: (id) => {
    return axios.get("/shoes/shoe/" + id);
  },
  editShoe: (id, submitData, token) => {
    return axios.patch("/shoes/shoe/" + id, submitData, {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  deleteShoe: (id, token) => {
    return axios.delete(`/shoes/${id}`, {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  searchShoes: (searchName) => {
    return axios.get(`/shoes/search?searchName=${searchName}&limit=${10}`);
  },
  getShoeFields: (gender, title, forKids) => {
    return axios.get(`/shoes/fields/${gender}/${title}?forKids=${forKids}`);
  },
  getShoePriceBoundries: (gender, title, forKids) => {
    return axios.get(
      `/shoes/fields/${gender}/${title}/boundries?forKids=${forKids}`
    );
  },
  getFilteredShoes: (gender, limit, skip, forKids, currentSort, filtersUrl) => {
    return axios.get(
      `/shoes/all/${gender}/?numOfPages=true&limit=${limit}&skip=${skip}&forKids=${forKids}&sortOption=${currentSort}${filtersUrl}`
    );
  },
};

export const OrdersAPI = {
  getOrders: (config) => {
    return axios.get("/orders/all", config);
  },
  getOrder: (formData) => {
    return axios.post("/orders", formData);
  },
  markOrderAsComplete: (id, token) => {
    return axios.patch(
      `/orders/complete/${id}`,
      {},
      {
        headers: {
          "X-Auth-Token": token,
        },
      }
    );
  },
};
