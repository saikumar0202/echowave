import axios, { AxiosResponse } from "axios";

const API_HOST = 'https://saavn.dev/api/';

const headers = {
  "Content-Type": "application/json",
};
// axios.defaults.withCredentials = true;

function GET(
  url: string,
  successCallback: (arg0: AxiosResponse<any, any>) => void,
  failureCallback: (arg0: any) => void,
  params = {}
) {
  axios
    .get(API_HOST + url, {
      params: params,
      headers,
    })
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failureCallback(err);
    });
}

function POST(
  url: string,
  body: any, successCallback: (arg0: AxiosResponse<any, any>) => void,
  failureCallback: (arg0: any) => void,
  params = {}
) {
  axios
    .post(API_HOST + url, body, {
      params: params,
      headers,
    })
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failureCallback(err);
    });
}
export { GET, POST };