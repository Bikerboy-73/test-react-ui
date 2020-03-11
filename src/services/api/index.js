import axios from "axios";
//import { COOKIE, getCookie, deleteCookie } from "../cookie";

/**
 * @name fetchApi
 * @description will fet the data based on params supplied
 * @param {string} param
 * @param {string} method
 * @param {object} variables
 */
export const fetchApi = (param = null, method = null, variables = null) =>
  axios({
    method: method,
    url: `${
      process.env.NODE_ENV == "development"
        ? "http://127.0.0.1:5000/api/v1"
        : "http://ogapi.ho.opspl.com/api/v1"
    }${param}`,
    data: variables,
    headers: {
      accept: "application/json",
      //"X-API-KEY": getCookie(COOKIE.ID_TOKEN)
      //location: getCookie(COOKIE.FARM)
    }
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      //console.log("The Api error", err.message);

      if (err.message === "Network Error") {
        return "Network Error";
      } else {
        let { status } = err.response;
        if (status === 401) {
          // deleteCookie(COOKIE.ID_TOKEN);
          // deleteCookie(COOKIE.NAME);
          // deleteCookie(COOKIE.ROLE);
          // deleteCookie(COOKIE.PUB_ID);
          // deleteCookie(COOKIE.USER_TYPE);
          //window.location.assign("/");
        } else if (status === 400) {
          if (err.response.data.violations) {
            return err.response.data;
          } else {
            return false;
          }
        }
      }
    });
