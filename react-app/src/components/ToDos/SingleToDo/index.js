import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleToDo } from "../../../store/todoDetails";
import CreateReviewModal from "../../Reviews/NewReview";
import EditReviewForm from "../../Reviews/EditReview";
import DeleteReviewForm from "../../Reviews/DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import { getFavorites, addFavorites, deleteFavorites } from "../../../store/favorite";
import "./SingleToDo.css"

export default function ToDoPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const todo = useSelector(state => state.todoDetails);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [hasReview, setHasReview] = useState(false)



    useEffect(() => {
        dispatch(getSingleToDo(id));
        if (user) {
            dispatch(getFavorites(user.id))
                .then(() => setLoadingFavorites(false))
                .catch((error) => {
                    console.error("Error fetching favorites:", error);
                    setLoadingFavorites(false);
                });
        } else {
            setLoadingFavorites(false)
        }
    }, [dispatch, id, user])

    useEffect(() => {
        if (user && favorite.length) {
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].toDo_id == id) {
                    setFavorite(true)
                }
            }
        }
    }, [favorites, id, user]);

    useEffect(() => {
        if (user && todo.reviews) {
            const userReview = todo.reviews.find(review => review.userId === user.id)
            setHasReview(!!userReview)
        }
    }, [user, todo])

    const addFav = () => {
        dispatch(addFavorites(user.id, id))
            .then(() => dispatch(getFavorites(user.id)))
            .then(() => setFavorite(true))
            .catch((error) => ("Error adding favorite: ", error));
    }

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].restaurId == id) {
                favId = favorites[i].id
            }
        }
        // ("hereeeee, ", favId)
        dispatch(deleteFavorites(favId, user.id))
            .then(() => dispatch(getFavorites(user.id)))
            .then(() => setFavorite(false))
            .catch((error) => ("Error deleting favorite: ", error));

    };
    console.log(todo)

    if (Object.keys(todo).length) {
        let reviews = 'Reviews';
        if (todo.reviews.length === 1) reviews = 'Review';

        const fullStars = Math.floor(todo.averageRating);
        const starArr = [];
        for (let i = 1; i <= fullStars; i++) {
            starArr.push(1);
        }
        if (todo.averageRating < 5) {
            const partialStar = todo.averageRating - fullStars;
            starArr.push(partialStar);
            const emptyStars = 5 - starArr.length;
            for (let i = 1; i <= emptyStars; i++) {
                starArr.push(0);
            }
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const convertDate = (date) => {
            const month = monthNames[new Date(date).getMonth()];
            const year = new Date(date).getFullYear();

            return (
                <p className="reviews-date">{month} {year}</p>
            )
        }

        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }
    

    return (
        <div className="outer-todo-container">
            <div className="todo-container">
                <div className="todo-cover-image">
                    <img className="todo-image-cover" src={`${todo.coverImage}`} alt='' />
                    {user && (
                        <span>
                            {favorite ? (
                                <button className="fav-button" onClick={deleteFav}>
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                            ): (
                                <button className="fav-button" onClick={addFav}>
                                        <i className="far fa-heart"></i>
                                </button>
                            )}
                        </span>
                    )}
                </div>
                <div className="todo-column1">
                    <ul className="todo-links">
                        <li className="todo-overview-link">
                            <a href="#top">Overview</a>
                        </li>
                        <li className="todo-review-link">
                            <a href="#todo-reviews">Reviews</a>
                        </li>
                    </ul>
                    <div id="top" className="todo-name">{`${todo.name}`}</div>
                    <div className="random-box">
                        <div className="rating-average-bar">
                        <div className="ratings">
                            <div className="star-row">
                                {starArr.map((star, i) => {
                                    if (star === 0) return <i className="fa-regular fa-star" key={i}></i>
                                    else if (star < 1) return <i className="fa-solid fa-star-half-stroke" key={i}></i>
                                    else return <i className="fa-solid fa-star" key={i}></i>
                                })}
                            </div>
                            <div className="number-rating">{todo.averageRating}</div>
                        </div>
                        <div className="review-summary">
                                    <i className="fa-regular fa-message"></i>
                                    <span>  {todo.reviews.length} {reviews}</span>
                        </div>
                        <div className="category"><i className="fa-solid fa-layer-group"></i>{todo.category}</div>
                        <div id="todo-reviews">
                            <div className="reviews-bar">
                                <div className="total-todo-reviews">{todo.reviews.length} {reviews}</div>
                                <div className="sort-reviews">{todo.reviews.length > 0 ? "Newest" : "No review yet"}</div>
                            </div>
                            <div className="reviews-area">
                                {
                                    todo.reviews.map((review, i) => (
                                        <div className="individual-review" key={review.id}>
                                            <div className="user-section"> 
                                                <p className="username"> {review.username} </p>
                                                <p className="date">{convertDate(review.createdAt)}</p>
                                            </div>
                                            <div className="review-comment2">{review.comment}</div>
                                            <div className="review-stars">
                                                    {
                                                        [...Array(5)].map((x, i) => {
                                                            if (i < Math.floor(review.rating)) {
                                                                return <i className="fa-solid fa-star" key={i}></i>;
                                                            } else if (i < review.rating) {
                                                                return <i className="fa-solid fa-star-half-stroke" key={i}></i>;
                                                            } else {
                                                                return <i className="fa-regular fa-star" key={i}></i>;
                                                            }
                                                        })
                                                    }
                                            </div>
                                            {review.reviewImage && (
                                                <div className="review-image-container2">
                                                    <img className="review-image2" src={review.reviewImage}></img>
                                                </div>
                                            )}
                                            <br></br>
                                            {user && user.id === review.userId && (
                                                <div className="review-modal-buttons">
                                                    <div className="edit-res-review">
                                                        <button className="edit-review-res-button">
                                                            <OpenModalButton
                                                                buttonText='Edit Review'
                                                                modalComponent={<EditReviewForm review={review} />}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="delete-res-review">
                                                        <button className="del-review-res-button">
                                                            <OpenModalButton
                                                                buttonText='Delete Review'
                                                                modalComponent={<DeleteReviewForm review={review} />}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                {!hasReview && user &&  (
                                                    <div className="review-modal-buttons">
                                                        <div className="edit-res-review">
                                                            <button className="edit-review-res-button">
                                                                <OpenModalButton
                                                                    buttonText='Post a Review'
                                                                    modalComponent={<CreateReviewModal todo={todo}/>}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
         

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="todo-column2">
                        <div className="todo-details-section">
                            <div className="details-header">
                                <h2>Details</h2>
                            </div>
                            <div className="details-container">
                                <div className="detail-item">
                                    <h3 className="details-header"><i className="fa-solid fa-layer-group"></i>Category</h3>
                                    <p>{todo.category}</p>
                                </div>
                                <div className="detail-item">
                                    <h3><i className="fa-solid fa-phone"></i>Phone Number</h3>
                                    <p>{todo.phoneNumber}</p>
                                </div>
                                <div className="detail-item">
                                    <h3><i className="fa-solid fa-location-dot"></i>Address</h3>
                                    <p>{todo.address}</p>
                                </div>
                                <div className="detail-item">
                                    <h3><i className="fa-solid fa-city"></i>{todo.city}, {todo.state}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        )
    } else {
        return <div>Loading...</div>
    }

}