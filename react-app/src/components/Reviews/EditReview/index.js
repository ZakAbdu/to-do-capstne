import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory} from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editReviews } from "../../../store/review";
import { getSingleToDo } from "../../../store/todoDetails";
import "./EditReview.css"

export default function EditReviewForm({ review }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    const [rating, setRating] = useState(review?.rating);
    const [comment, setComment] = useState(review?.comment);
    const [review_image, setReviewImage] = useState(review?.reviewImage);
    const [errors, setErrors] = useState([]);
    const [emptyField, setEmptyField] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [hover, setHover] = useState(0);
    const starArr = ["", "", "", "", ""];

    const isImageURL = (url) => {
      return /\.(png|jpe?g)$/i.test(url);
    };

    useEffect(() => {
        const errors = [];

        if (comment.length < 10 || comment.length > 500 || rating < 1) {
        setEmptyField(true);
        } else setEmptyField(false)

        if (review_image) {
          if (!isImageURL(review_image)) {
            errors.review_image = "Please provide a valid image url ending in .png, .jpg, or .jpeg";
          }
        }
        if (comment.length > 500) {
          errors.comment = 'Review must be between 10 and 500 characters'
        }

        setErrors(errors);

    }, [comment, rating, review_image]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

    const newReview = {
        rating,
        comment,
        review_image
    };

    if (Object.keys(errors).length > 0) return;

    if (currentUser) {
        const data = await dispatch(editReviews(review.todo_id, review.id, newReview))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          })
    } else {
        return <Redirect to='/signup' />;
    }

    dispatch(getSingleToDo(review.todo_id))

    closeModal();
  }

  return (
    <div className="edit-review">
        <form onSubmit={handleSubmit} className="editReview-form">
            <h1 className="review-header">How was your experience?</h1>
            <textarea
                className="editReview-comment"
                placeholder="Leave your review here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {<span className="error">{errors.comment}</span>}
            <textarea
                className="editReview-image"
                placeholder="Image URL"
                value={review_image}
                onChange={(e) => setReviewImage(e.target.value)}
            />
            {<span className="error">{errors.review_image}</span>}
            <div className="editRating-container">
                <p className="rating-text"><b>Rating</b></p>
                {starArr.map((starEl, index) => {
                    index++
                    return (
                        <button
                        className="star-button"
                        key={`index${index}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setRating(index)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        >
                        <i className={index <= (hover || rating) ? 'fa-solid fa-star solid-star' : 'fa-regular fa-star hollow-star'}></i>
                        </button>
                    );
                })}
            </div>
            <button
                className={emptyField || errors.review_image ? 'submit-review-button-disabled' : 'submit-review-button'}
                disabled={emptyField || errors.review_image}
                type='submit'>Update Review</button>
        </form>
    </div>
  )
}