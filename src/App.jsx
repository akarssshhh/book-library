import { useRef, useState, useMemo } from "react";

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

  // LIBRARY STATISTICS
  const bookStats = useMemo(() => {
    const stats = {
      total: books.length,
      reading: 0,
      finished: 0,
      wantToRead: 0,
    };

    books.forEach((book) => {
      if (book.status === "reading") {
        stats.reading++;
      } else if (book.status === "finished") {
        stats.finished++;
      } else if (book.status === "want to read") {
        stats.wantToRead++;
      }
    });

    return stats;
  }, [books]);

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

        {/* Library Statistics */}
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-800 bg-slate-900 px-5 py-3 text-sm">

          <span className="font-semibold text-slate-200">
            Library:
          </span>

          <span className="text-slate-400">
            Total{" "}
            <span className="font-semibold text-slate-100">
              {bookStats.total}
            </span>
          </span>

          <span className="text-slate-400">
            Want to Read{" "}
            <span className="font-semibold text-slate-100">
              {bookStats.wantToRead}
            </span>
          </span>

          <span className="text-slate-400">
            Reading{" "}
            <span className="font-semibold text-slate-100">
              {bookStats.reading}
            </span>
          </span>

          <span className="text-slate-400">
            Finished{" "}
            <span className="font-semibold text-slate-100">
              {bookStats.finished}
            </span>
          </span>

        </div>

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