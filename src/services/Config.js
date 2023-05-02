const BASE_PATH = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const Config = {
  getToken: {
    token: BASE_PATH + "/authentication/token/new?api_key=" + API_KEY,
  },
  login: {
    loginUser:
      BASE_PATH +
      "/authentication/token/validate_with_login?api_key=" +
      API_KEY,
  },
  getDashboardData: {
    dashbordData: (id) => {
      return (
        BASE_PATH + "/trending/movie/day?api_key=" + API_KEY + `&page=${id}`
      );
    },
  },
  searchedData: {
    search: (searchedValue, pageNumber) =>
      BASE_PATH +
      "/search/movie?api_key=" +
      API_KEY +
      `&language=en-US&query=${searchedValue}&page=${pageNumber}&include_adult=false`,
  },
  getMovieDetails: {
    details: (id) =>
      BASE_PATH + `/movie/${id}?api_key=` + API_KEY + `&language=en-US`,
  },
  getVideoDetail: {
    videoDetail: (id) => {
      return (
        BASE_PATH + `/movie/${id}/videos?api_key=` + API_KEY + `&language=en-US`
      );
    },
  },
};

export default Config;
