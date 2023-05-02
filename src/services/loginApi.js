import Config from "./Config";
import apiCall from "./apiUtils/ApiCall";

const loginApi = {
  onLogin: (callback, fail, payload) => {
    apiCall.makePostRequest(
      Config.login.loginUser,
      callback,
      fail,
      payload,
      {}
    );
  },
  fetchToken: (callback, fail) => {
    apiCall.makeGetRequest(Config.getToken.token, callback, fail);
  },
};

export default loginApi;
