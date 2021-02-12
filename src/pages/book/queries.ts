import axios from 'axios';

export async function queryGetBooks(): Promise<any> {
  return axios({
    method: 'POST',
    url: `http://localhost:5000/book/search`,
    data:{},
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
