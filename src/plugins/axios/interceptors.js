function returnData(response) {
  return response.data.data;
}

export default function (axios) {
  axios.interceptors.response.use(returnData);
}
