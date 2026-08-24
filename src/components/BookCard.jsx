function BookCard({ book, onEdit, onDelete }) {
  const statusClass = {
    "want to read": "bg-slate-800 text-slate-300",
    reading: "bg-blue-950 text-blue-300",
    finished: "bg-emerald-950 text-emerald-300",
  };

  const stars =
    "★".repeat(Number(book.rating)) +
    "☆".repeat(5 - Number(book.rating));

  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20">

      {/* Top */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            statusClass[book.status] ||
            "bg-slate-800 text-slate-300"
          }`}
        >
          {book.status}
        </span>

        <span className="text-xs text-slate-600">
          #{book.id}
        </span>
      </div>

      {/* Book information */}
      <div className="mt-7 min-h-32">
        <h3 className="text-xl font-bold leading-tight text-slate-100">
          {book.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          by {book.author}
        </p>

        <span className="mt-5 inline-block rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-500">
          {book.genre}
        </span>
      </div>

      {/* Rating */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm tracking-widest text-slate-300">
          {stars}
        </span>

        <span className="text-xs text-slate-500">
          {book.rating}/5
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">

        <button
          type="button"
          onClick={() => onEdit(book)}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(book.id)}
          className="flex-1 rounded-lg border border-red-900 bg-red-950 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900"
        >
          Delete
        </button>

      </div>

    </article>
  );
}

export default BookCard;