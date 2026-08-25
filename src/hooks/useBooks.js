import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/books";

function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
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
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    books,
    loading,
    error,
    saving,
    addBook,
    updateBook,
    deleteBook,
  };
}

export default useBooks;