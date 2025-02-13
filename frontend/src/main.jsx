import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Home from './Home.jsx'
import BooksPage from './pages/bookspage.jsx'
import Book from './pages/book.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/:bookId" element={<Book />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
