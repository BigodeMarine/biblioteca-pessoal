import React, { useState, useEffect, useCallback } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Book } from './types/Book';
import * as api from './api/apiService';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os livros da API
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedBooks = await api.getBooks();
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
      setError("Não foi possível carregar os livros. Verifique sua URL do crudcrud.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Função para adicionar um livro
  const handleAddBook = async (newBookData: Omit<Book, '_id'>) => {
    try {
      const addedBook = await api.addBook(newBookData);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (err) {
      console.error("Erro ao adicionar livro:", err);
      setError("Falha ao adicionar o livro.");
    }
  };

  // Função para remover um livro
  const handleDeleteBook = async (id: string) => {
    try {
      await api.deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Erro ao remover livro:", err);
      setError("Falha ao remover o livro.");
    }
  };
  
  // Função para atualizar o status do livro
  const handleUpdateBookStatus = async (id: string, book: Omit<Book, '_id' | 'status'>) => {
    try {
      const currentBook = books.find(b => b._id === id);
      if (!currentBook) return;

      const newStatus = currentBook.status === 'Lido' ? 'Não Lido' : 'Lido';
      await api.updateBookStatus(id, book, newStatus);
      
      // Atualiza o estado local para refletir a mudança imediatamente
      setBooks(prevBooks => 
        prevBooks.map(b => 
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      setError("Falha ao atualizar o status do livro.");
    }
  };


  return (
    <div className="App">
      <header>
        <h1>Minha Biblioteca Pessoal</h1>
      </header>
      <main>
        <BookForm onAddBook={handleAddBook} />
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Carregando livros...</p>
        ) : (
          <BookList 
            books={books} 
            onDeleteBook={handleDeleteBook} 
            onUpdateBookStatus={handleUpdateBookStatus} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
