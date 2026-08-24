import { useEffect, useState } from "react";

import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";

const API_URL = "http://localhost:3001/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // M3
  const [editingBook, setEditingBook] = useState(null);
  const [saving, setSaving] = useState(false);

  // M1 - GET BOOKS
  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();

        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  // M2 - CREATE BOOK
  const addBook = async (bookData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to create book");
      }

      const createdBook = await response.json();

      setBooks((previousBooks) => [
        ...previousBooks,
        createdBook,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // M3 - UPDATE BOOK
  const updateBook = async (id, updatedData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await response.json();

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book.id === updatedBook.id
            ? updatedBook
            : book
        )
      );

      setEditingBook(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // M3 - START EDITING
  const startEditing = (book) => {
    setEditingBook(book);
    setError(null);
  };

  // M3 - CANCEL EDITING
  const cancelEditing = () => {
    setEditingBook(null);
    setError(null);
  };

  // M4 - DELETE BOOK
  const deleteBook = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );

      if (editingBook?.id === id) {
        setEditingBook(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="mb-8 text-4xl font-bold">
          Book Library
        </h1>

        {error && (
          <p className="mb-5 rounded-lg border border-red-900 bg-red-950 p-4 text-red-300">
            {error}
          </p>
        )}

        <BookForm
          key={editingBook?.id || "new"}
          onAdd={addBook}
          onUpdate={updateBook}
          editingBook={editingBook}
          onCancelEdit={cancelEditing}
          saving={saving}
        />

        {books.length === 0 ? (
          <p className="mt-8">
            No books found.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={startEditing}
                onDelete={deleteBook}
              />
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default App;