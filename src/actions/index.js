import axios from 'axios';

const ROOT_URL = '/data.json';
export const FETCH_BOOKS = 'fetch_books';
export const ADD_BOOK = 'add_book';
export const DELETE_BOOK = 'delete_book';
export const EDIT_BOOK = 'edit_book';

export function fetchBooks(){
  const request = axios.get(`${ROOT_URL}`);
  return{
    type: FETCH_BOOKS,
    payload: request
  };
}


export function addBook(values){
  return{
    type: ADD_BOOK,
    payload: values
  };
}

export function deleteBook(id){
  return{
    type: DELETE_BOOK,
    payload: {'data':{id}}
  };
}

export function editBook(values){
  return{
    type: EDIT_BOOK,
    payload: values
  };
}
