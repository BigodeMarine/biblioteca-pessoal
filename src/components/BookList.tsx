import React from 'react';
import { Book } from '../types/Book';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
  onUpdateBookStatus: (id: string, book: Omit<Book, '_id' | 'status'>) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDeleteBook, onUpdateBookStatus }) => {
  if (books.length === 0) {
    return <p>Nenhum livro cadastrado ainda.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDeleteBook}
          onUpdateStatus={onUpdateBookStatus}
        />
      ))}
    </div>
  );
};

export default BookList;