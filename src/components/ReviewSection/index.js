import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class ReviewSection extends Component {
  state = {
    rating: 5,
    reviewText: '',
  }

  handleRatingChange = rating => {
    this.setState({rating})
  }

  handleTextChange = e => {
    this.setState({reviewText: e.target.value})
  }

  handleSubmit = (e, addReview) => {
    e.preventDefault()
    const {productId} = this.props
    const {rating, reviewText} = this.state

    if (!reviewText.trim()) return

    const newReview = {
      id: `REV-${Date.now()}`,
      author: 'You',
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
    }

    addReview(productId, newReview)
    this.setState({rating: 5, reviewText: ''})
  }

  render() {
    const {productId} = this.props
    const {rating, reviewText} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {reviews, addReview} = value
          const productReviews = reviews[productId] || []

          return (
            <div className="reviews-container">
              <h1 className="reviews-heading">Customer Reviews</h1>

              <div className="reviews-layout">
                <div className="reviews-list-section">
                  {productReviews.length === 0 ? (
                    <p className="no-reviews-msg">
                      No reviews yet. Be the first to review this product!
                    </p>
                  ) : (
                    <ul className="reviews-list">
                      {productReviews.map(review => (
                        <li key={review.id} className="review-item">
                          <div className="review-header">
                            <div className="review-author-avatar">
                              {review.author.charAt(0)}
                            </div>
                            <div className="review-meta">
                              <p className="review-author">{review.author}</p>
                              <p className="review-date">{review.date}</p>
                            </div>
                            <div className="review-stars">
                              {[1, 2, 3, 4, 5].map(star => (
                                <svg
                                  key={star}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill={
                                    star <= review.rating ? '#fbbf24' : 'none'
                                  }
                                  stroke={
                                    star <= review.rating
                                      ? '#fbbf24'
                                      : '#606080'
                                  }
                                  strokeWidth="2"
                                  className="star-icon"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="review-text">{review.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="review-form-section">
                  <h2 className="write-review-heading">Write a Review</h2>
                  <form
                    className="review-form"
                    onSubmit={e => this.handleSubmit(e, addReview)}
                  >
                    <div className="rating-select">
                      <p>Your Rating</p>
                      <div className="rating-stars-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            className={`star-btn ${
                              star <= rating ? 'active' : ''
                            }`}
                            onClick={() => this.handleRatingChange(star)}
                            aria-label={`Rate ${star} stars`}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill={star <= rating ? '#fbbf24' : 'none'}
                              stroke={star <= rating ? '#fbbf24' : '#a0a0c0'}
                              strokeWidth="2"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      className="review-textarea"
                      placeholder="What did you think about this product?"
                      value={reviewText}
                      onChange={this.handleTextChange}
                      rows="4"
                    />

                    <button
                      type="submit"
                      className="submit-review-btn"
                      disabled={!reviewText.trim()}
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default ReviewSection
