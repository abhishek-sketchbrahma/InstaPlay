import axios from "axios";

const apiCall = {
  makeGetRequest(path, callback, fail) {
    axios
      .get(path)
      .then(callback)
      .catch((e) => {
        fail(e);
      });
  },

  makePostRequest(path, callback, fail, payload) {
    axios
      .post(path, payload)
      .then(callback)
      .catch((e) => {
        fail(e);
      });
  },

  makePostRequestWithFormData(path, callback, fail, payload) {
    axios
      .post(path, payload)
      .then(callback)
      .catch((e) => {
        fail(e);
      });
  },
};

export default apiCall;
