import axios from 'axios';
import { Book, BookStatus } from '../types/Book';

const API_URL = 'https://crudcrud.com/api/45e8be9d6f924dc2aa663ba9ba4d5e12/books';

type NewBookData = Omit<Book, '_id'>;

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (bookData: NewBookData): Promise<Book> => {
  const response = await axios.post(API_URL, bookData);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateBookStatus = async (id: string, book: Omit<Book, '_id' | 'status'>, newStatus: BookStatus): Promise<void> => {

  const updatedBook = {
    title: book.title,
    author: book.author,
    status: newStatus,
  };
  await axios.put(`${API_URL}/${id}`, updatedBook);
};