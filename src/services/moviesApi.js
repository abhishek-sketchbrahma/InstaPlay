import Config from "./Config";
import apiCall from "./apiUtils/ApiCall";

const moviesApi = {
  getMoviesList: (callback, fail, id) => {
    apiCall.makeGetRequest(
      Config.getDashboardData.dashbordData(id),
      callback,
      fail
    );
  },
  searchMovie: (searchedValue, pageNumber, callback, fail) => {
    apiCall.makeGetRequest(
      Config.searchedData.search(searchedValue, pageNumber),
      callback,
      fail
    );
  },
  MovieDetails: (id, callback, fail) => {
    apiCall.makeGetRequest(Config.getMovieDetails.details(id), callback, fail);
  },
  getVideoDetail: (id, callback, fail) => {
    apiCall.makeGetRequest(
      Config.getVideoDetail.videoDetail(id),
      callback,
      fail
    );
  },
};
export default moviesApi;
