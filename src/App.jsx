import { useRef, useState } from "react";

import useBooks from "./hooks/useBooks";

import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";

function App() {
  const {
    books,
    loading,
    error,
    saving,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  // M3 - EDITING
  const [editingBook, setEditingBook] = useState(null);

  // Reference to the BookForm
  const formRef = useRef(null);

  // START EDITING
  const startEditing = (book) => {
    setEditingBook(book);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  // CANCEL EDITING
  const cancelEditing = () => {
    setEditingBook(null);
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

        {/* Book Form */}
        <div ref={formRef}>
          <BookForm
            key={editingBook?.id || "new"}
            onAdd={addBook}
            onUpdate={updateBook}
            editingBook={editingBook}
            onCancelEdit={cancelEditing}
            saving={saving}
          />
        </div>

        {/* Book List */}
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