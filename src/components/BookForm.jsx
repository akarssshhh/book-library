import { useState } from "react";

function BookForm({
  onAdd,
  onUpdate,
  editingBook,
  onCancelEdit,
  saving,
}) {
  const [formData, setFormData] = useState({
    title: editingBook?.title || "",
    author: editingBook?.author || "",
    genre: editingBook?.genre || "",
    status: editingBook?.status || "want to read",
    rating: editingBook?.rating || 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      status: formData.status,
      rating: Number(formData.rating),
    };

    if (editingBook) {
      await onUpdate(editingBook.id, bookData);
    } else {
      await onAdd(bookData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-100">
        {editingBook ? "Edit Book" : "Add a New Book"}
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The Hobbit"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="e.g. J.R.R. Tolkien"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Genre
          </label>

          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          >
            <option value="want to read">
              Want to read
            </option>

            <option value="reading">
              Reading
            </option>

            <option value="finished">
              Finished
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Rating
          </label>

          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-100 px-5 py-3 font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingBook
                ? "Update Book"
                : "Add Book"}
          </button>

          {editingBook && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-300"
            >
              Cancel
            </button>
          )}

        </div>

      </div>
    </form>
  );
}

export default BookForm;