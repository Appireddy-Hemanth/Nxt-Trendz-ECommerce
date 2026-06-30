import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import {playHoverSound} from '../../utils/haptics'
import './index.css'

class ProductCard extends Component {
  onClickCard = () => {
    const {productData, history} = this.props
    history.push(`/products/${productData.id}`)
  }

  render() {
    const {productData} = this.props
    const {title, brand, imageUrl, rating, price, id} = productData

    return (
      <CartContext.Consumer>
        {value => {
          const {wishlist, toggleWishlistItem} = value
          const wishlisted = wishlist.some(item => item.id === id)

          const onToggleWishlist = e => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlistItem(productData)
          }

          return (
            <li
              className="product-item"
              onClick={this.onClickCard}
              onMouseEnter={playHoverSound}
              style={{cursor: 'pointer'}}
            >
              <div className="product-img-wrapper">
                <img src={imageUrl} alt={title} className="thumbnail" />
                {/* Wishlist button */}
                <button
                  type="button"
                  className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
                  onClick={onToggleWishlist}
                  aria-label={
                    wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={wishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                {/* Quick view overlay */}
                <div className="product-quick-view">
                  <button
                    type="button"
                    className="quick-view-text"
                    onClick={e => {
                      e.stopPropagation()
                      const {onQuickView} = this.props
                      if (onQuickView) onQuickView(productData)
                    }}
                  >
                    Quick View ↗
                  </button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-header-row">
                  <h1 className="title">{title}</h1>
                  {/* Compare Toggle */}
                  <label
                    className="compare-checkbox-label"
                    onClick={e => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="compare-checkbox"
                      onChange={e => {
                        const {onToggleCompare} = this.props
                        if (onToggleCompare)
                          onToggleCompare(productData, e.target.checked)
                      }}
                    />
                    <span className="compare-text">Compare</span>
                  </label>
                </div>
                <p className="brand">by {brand}</p>
                <div className="product-details">
                  <p className="price">₹{price.toLocaleString()}</p>
                  <div className="rating-container">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#fbbf24"
                      stroke="#fbbf24"
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <p className="rating">{rating}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(ProductCard)
