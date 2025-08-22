import React from 'react';
import { Book } from '../types/Book';

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, book: Omit<Book, '_id' | 'status'>) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onUpdateStatus }) => {
  const { _id, title, author, status } = book;

  return (
    <div className="book-item">
      <div>
        <h3>{title}</h3>
        <p>por {author}</p>
      </div>
      <div className="book-actions">
        <button
          className={`status-btn ${status === 'Lido' ? 'read' : 'unread'}`}
          onClick={() => onUpdateStatus(_id, { title, author })}
        >
          {status}
        </button>
        <button className="delete-btn" onClick={() => onDelete(_id)}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default BookItem;