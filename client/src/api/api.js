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
    return axios.patch(
      `/users/role/admin/${userId}`,
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
  getShoe: (id) => {
    return axios.get("/shoes/" + id);
  },
  editShoe: (id, submitData, token) => {
    return axios.patch("/shoes/" + id, submitData, {
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
    return axios.get(`/shoes?searchName=${searchName}&limit=${10}`);
  },
  getShoeFields: (gender, forKids, fields) => {
    return axios.get(
      `/shoes/filters/fields?gender=${gender}&forKids=${forKids}&fields=${fields}`
    );
  },
  getFilteredShoes: ({ limit, skip, currentSort, filtersQueryParams }) => {
    return axios.get(
      `/shoes/filtered/all?limit=${limit}&skip=${skip}&sortOption=${currentSort}&${filtersQueryParams}`
    );
  },
};

export const OrdersAPI = {
  getOrders: (config) => {
    return axios.get("/orders", config);
  },
  sendOrder: (formData) => {
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
