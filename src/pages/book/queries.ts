import axios from 'axios';
import { IBook } from "@/pages/book/BookList";

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


export async function queryDeleteBook(id:string): Promise<any> {
  return axios({
    method: 'DELETE',
    url: `http://localhost:5000/book/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}


export async function queryCreateBook(book:any): Promise<any> {
  return axios({
    method: 'POST',
    url: `http://localhost:5000/book`,
    data:book
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

