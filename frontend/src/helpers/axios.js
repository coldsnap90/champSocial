import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";


//request interceptior
const axiosService = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

//get access token from local storage, and add to header of request
axiosService.interceptors.request.use(async (config) => {
    const {access} = JSON.parse(localStorage.getItem("auth"));
    config.headers.Authorization = `Bearer ${access}`;
    return config;
});

//return resolved or rejected promise
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);

//refresh function for failedrequest
const refreshAuthLogic = async (failedRequest) => {
    const {refresh} = JSON.parse(localStorage.getItem("auth"));
    return axios.post("/refresh/token",null,{
        baseURL: "http://localhost:8000",
        headers : {
            Authorization: `Bearer ${refresh}`,},
        }).then((resp)=>{
            const {access,refresh} = resp.data;
            failedRequest.response.config.headers[
                "Authorization"
            ] = "Bearer " + access;
            localStorage.setItem("auth",JSON.stringify({access,refresh}));
        }).catch(() => {localStorage.removeItem("auth");});
};

createAuthRefreshInterceptor(axiosService,refreshAuthLogic);
export function fetcher(url) {
    return axiosService.get(url).then((res) => res.data);
}

export default axiosService;
