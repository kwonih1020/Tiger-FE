import axios from "axios";

const userToken = localStorage.getItem("userToken");
const refreshToken = localStorage.getItem("refreshToken");

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
  headers: {
    "Content-Type": "application/json",
    Authorization: userToken,
    RefreshToken: refreshToken,
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    const {
      config,
      response: { data },
    } = error;

    const originalRequest = config;

    if (data.message === "잘못된 JWT 토큰 입니다") {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/api/member/reissue`,
          { refreshToken, userToken }
        );

        console.log(data);

        const newAccessToken = data.data.userToken;
        const newRefreshToken = data.data.refreshToken;

        originalRequest.headers = {
          "Content-Type": "application/json",
          Authorization: newAccessToken,
          RefreshToken: newRefreshToken,
        };
        localStorage.setItem("userToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return await axios(originalRequest);
      } catch (err) {
        new Error(err);
      }
    }
    return console.log(error);
  }
);

// export const apis = {
//   reissue: async (refreshToken, userToken) => {
//     const requestRes = await axiosInstance.get("/api/member/reissue", {
//       headers: {
//         Authorization: userToken,
//         RefreshToken: refreshToken,
//       },
//     });
//     return requestRes.headers;
//   },
// };
