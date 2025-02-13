import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function BooksPage() {

  const navigate = useNavigate();


  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/book')
      .then(response => response.json())
      .then(data => setBooks(data));
  }
    , []);

  console.log(books);

  return (
    <div className='px-32 py-12 flex justify-between flex-col items-center min-w-screen gap-20'>
      <Row gutter={16} className='gap-10'>
        {books.map((book, index) => (
          <Col key={index} span={8}>
            <Card title={book.title} variant="borderless" className='cursor-pointer' onClick={() => { navigate('/' + book._id) }}>
              {book.author && <p><strong>Author:</strong> {book.author}</p>}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}