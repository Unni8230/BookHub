# 📚 BookHub

**BookHub** is a responsive React-based web application that fetches and displays books from an external API. Users can browse books by category, search for specific titles, and view detailed information—all within a clean, intuitive UI.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blueviolet?logo=mongodb)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## 🚀 Features

- 🔐 **Login Authentication** with JWT
- 📚 **Bookshelves View** categorized by genres
- 🔍 **Search Functionality** to find books by title
- 📄 **Book Details Page** with cover, author, rating, and description
- 🔄 **API Integration** to fetch book data dynamically
- 💅 **Responsive Design** for mobile and desktop

---

## 🛠️ Tech Stack

| Tool             | Purpose                            |
|------------------|------------------------------------|
| React            | Front-end UI framework             |
| React Router DOM | Client-side routing                |
| JWT              | Authentication token handling      |
| REST API         | Fetching book data                 |
| CSS              | Styling and layout                 |

---

## 📂 Folder Structure

```
src/
├── components/       # Reusable UI components
├── App.js            # Main app and routing logic
├── index.js          # Entry point
├── App.css           # Global styles
└── setupTests.js     # Test configuration
```

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/Unni8230/BookHub.git

# Navigate into the project
cd BookHub

# Install dependencies
npm install

# Start the development server
npm start
```

> 🛠 If you're using Node.js v17+, run:
> ```bash
> export NODE_OPTIONS=--openssl-legacy-provider
> ```

---

## 🔐 Authentication Flow

- Users must log in to access the main app
- JWT is stored securely and validated on protected routes
- Unauthenticated users are redirected to the login page

---

## 🙌 Credits

Built with ❤️ by [Unni](https://github.com/Unni8230) as part of a React learning journey. Inspired by the love for books and clean UI design.

---
