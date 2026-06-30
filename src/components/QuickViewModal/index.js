import {Component} from 'react'
import CartContext from '../../context/CartContext'
import {flyToCart} from '../../utils/flyToCart'
import './index.css'

class QuickViewModal extends Component {
  state = {
    quantity: 1,
  }

  onDecrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }))
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {product, onClose} = this.props
    const {quantity} = this.state

    if (!product) return null

    const {
      title,
      brand,
      imageUrl,
      rating,
      price,
      description,
      totalReviews,
    } = product

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onClickAddToCart = event => {
            addCartItem({...product, quantity})
            if (event && event.clientX) {
              flyToCart(event, imageUrl)
            }
            setTimeout(() => onClose(), 600) // Close after animation
          }

          return (
            <div
              className="quickview-overlay"
              onClick={onClose}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Escape') onClose()
              }}
            >
              <div
                className="quickview-modal"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button
                  type="button"
                  className="quickview-close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="quickview-content">
                  <div className="quickview-img-wrapper">
                    <img src={imageUrl} alt={title} className="quickview-img" />
                  </div>

                  <div className="quickview-details">
                    <h1 className="quickview-title">{title}</h1>
                    <p className="quickview-price">Rs {price}/-</p>
                    <div className="quickview-rating-wrapper">
                      <div className="quickview-rating">
                        <p>{rating}</p>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <p className="quickview-reviews">
                        {totalReviews || 12} Reviews
                      </p>
                    </div>

                    <p className="quickview-desc">
                      {description ||
                        'This is a premium product available at Nxt Trendz. Crafted with the finest materials and an exquisite attention to detail.'}
                    </p>

                    <div className="quickview-brand">
                      <span className="brand-label">Available:</span> In Stock
                    </div>
                    <div className="quickview-brand">
                      <span className="brand-label">Brand:</span> {brand}
                    </div>

                    <hr className="quickview-divider" />

                    <div className="quickview-actions">
                      <div className="quantity-controller">
                        <button
                          type="button"
                          onClick={this.onDecrementQuantity}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <p className="qty-value">{quantity}</p>
                        <button
                          type="button"
                          onClick={this.onIncrementQuantity}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="quickview-add-cart-btn"
                        onClick={onClickAddToCart}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default QuickViewModal
