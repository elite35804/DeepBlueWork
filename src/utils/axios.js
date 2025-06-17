import axios from 'axios';
import { SERVER_BASE_URL } from '@/Constants';
import {useOvermind} from '@/store';
import {getSecondsPassed} from '@/utils/DateUtil';

const requestService = axios.create({
  baseURL: SERVER_BASE_URL + '/v1',
  timeout: 30000,
});

// const {state, actions} = useOvermind();
const state = {}

requestService.interceptors.request.use(async (config) => {
  const {
    created_at,
  } = state || {}


  if (
    created_at &&
    config.url !== "/token" &&
    config.url !== "/login"
  ) {

    let seconds = getSecondsPassed(created_at)

    // if (seconds > 1200) { //todo: reduce time to 10 sec for testing
    //   const { data } = await store.dispatch(getToken())
    //   accessToken = data?.access_token
    // }

  }

  if (config.url !== "/login")
    config.headers.Authorization = `Bearer ${config.access_token}`

  return config;
});

requestService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const {
      status,
      data,
    } = error.response || {}

    if (status === 400)
      if (typeof data == "string") {
        // actions.alert.showError({message: data})
        return
      }

    if (error.code === "ECONNABORTED") {
      console.log(error, "ECONNABORTED error ");

      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject(error);
    } else if (error.response && error.response.status !== 404) {
      if (
        error.request.responseType === "blob" &&
        error.response.data instanceof Blob &&
        error.response.data.type &&
        error.response.data.type.toLowerCase().indexOf("json") !== -1
      ) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = () => {
            error.response.data = JSON.parse(reader.result);
            resolve(Promise.reject(error));
          };

          reader.onerror = () => {
            reject(error);
          };

          reader.readAsText(error.response.data);
        });
      } else {
        const msg = error.response.data.message ||
          error.response.data.Message ||
          "Something Went Wrong";
        const msgArray = msg.split(',\n');
        for (let message of msgArray) {
          // actions.alert.showError({message: message})
          // Snackbar.show({
          //   textColor: 'white',
          //   backgroundColor: 'red',
          //   text: message,
          //   duration: Snackbar.LENGTH_LONG,
          // })
        }
      }
    }
    if (
      error.response.status === 401 ||
      error.response.status === 306
    ) {
      if (error.response.status === 401) {
        // actions.logout();
      }
    }
    return Promise.reject(error);
  }
);


export default requestService;
