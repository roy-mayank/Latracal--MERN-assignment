import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Rate } from "antd";

export default function Book() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/book/${bookId}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Error fetching book:", err));

    axios.get(`http://localhost:5000/review?bookId=${bookId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [bookId]);

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/review", { ...newReview, bookId });
      setReviews([...reviews, newReview]);
      setNewReview({ user: "", comment: "", rating: 0 });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };


  if (!book) return <div>Loading...</div>;

  return (
    <div className='px-32 py-12 flex justify-between flex-col items-center min-w-screen gap-10'>
      <div className="gap-3 flex flex-col items-center"><h1>{book.title}</h1>
        <h3 className="font-semibold">By {book.author}</h3>
        <p className="text-center">{book.summary}</p>
        <div className="flex"><Rate disabled defaultValue={book.rating} /><p>{book.rating}/5</p></div>
      </div>
      <div className="flex flex-col items-center gap-5">
        {reviews.length ? (
          reviews
            .filter((review) => review.bookId === bookId)
            .map((review, index) => (
              <div key={index} className="flex gap-10">
                <p><strong>{review.user}:</strong> &quot;{review.comment}&quot; </p>
                <Rate disabled defaultValue={review.rating} />
              </div>
            ))
        ) : (
          <p>No reviews yet.</p>
        )}</div>

      <h2 className="font-bold text-xl">Want to add your own Review?</h2>

      <form onSubmit={onFinish} className="flex gap-5 items-center align-middle">
        <input
          type="text"
          placeholder="Your name"
          value={newReview.user}
          className="border-2 border-gray-300 rounded-2xl p-3"
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          required
        />
        <textarea
          placeholder="Your review"
          value={newReview.comment}
          className="border-2 border-gray-300 rounded-2xl p-3"
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          value={newReview.rating}
          className="border-2 border-gray-300 rounded-2xl px-3 py-1"
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
