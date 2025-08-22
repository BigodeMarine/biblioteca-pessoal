import React, { useState } from 'react';
import { Book } from '../types/Book';

interface BookFormProps {
  onAddBook: (book: Omit<Book, '_id'>) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !author) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    onAddBook({ title, author, status: 'Não Lido' });
    
    // Limpa os campos após o envio
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>Adicionar Novo Livro</h2>
      <input
        type="text"
        placeholder="Título do livro"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor do livro"
        value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default BookForm;