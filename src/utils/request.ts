import axios from "axios";
import qs from "query-string";
import router from "../router";
const service = axios.create({
  baseURL: "/api", // 请求前缀
  withCredentials: false, //  allow is Cookie
  timeout: 30000, // timeout 默认30秒超时
});

service.interceptors.request.use(
  (config) => {
    var token = localStorage.getItem("TOKEN");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    var res = JSON.parse(response.data);
    if (res.success) {
      return res;
    } else {
      if (res.info.code=="Login") {
        localStorage.removeItem("TOKEN");
        router.push({ path: "/login" });
      }
      return res;
    }
  },
  (error) => {
    switch (error.code) {
      case "ECONNABORTED":
        router.push({ path: "/error" });
        break;
    }
    return Promise.reject(error);
  }
);

export default {
  form({ url="", data={}, method = "post", resType = "text" }) {
    return service({
      url: url,
      method: method,
      responseType: resType,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify(data),
    });
  },
  post({ url, data }) {
    return service({
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      data,
    });
  },
};
