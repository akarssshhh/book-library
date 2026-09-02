# Book Library

A React-based Book Library application that allows users to manage a collection of books using CRUD operations and a REST API powered by JSON Server.

## Features

- Add new books
- View all books
- Edit existing books
- Delete books
- Track book reading status
  - Want to Read
  - Reading
  - Finished
- Rate books from 0–5
- Display total number of books
- Display books by reading status
- Calculate average book rating
- Responsive user interface
- Custom React Hook for API operations
- Loading and error handling
- Automatic Git update workflow

## Tech Stack

- React
- JavaScript
- Tailwind CSS
- JSON Server
- REST API
- Fetch API
- Git
- GitHub

## Project Structure

```text
Book-library/
│
├── db.json
├── package.json
├── package-lock.json
├── README.md
│
└── src/
    │
    ├── App.jsx
    │
    ├── components/
    │   ├── BookCard.jsx
    │   └── BookForm.jsx
    │
    └── hooks/
        └── useBooks.js
