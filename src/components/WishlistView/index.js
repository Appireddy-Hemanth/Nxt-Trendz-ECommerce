import {Link} from 'react-router-dom'
import Header from '../Header'
import ProductCard from '../ProductCard'
import CartContext from '../../context/CartContext'
import './index.css'

const WishlistView = () => (
  <CartContext.Consumer>
    {value => {
      const {wishlist} = value

      return (
        <>
          <Header />
          <div className="wishlist-container">
            <div className="wishlist-content">
              <h1 className="wishlist-heading">
                My Wishlist{' '}
                <span className="wishlist-count">({wishlist.length})</span>
              </h1>

              {wishlist.length === 0 ? (
                <div className="empty-wishlist-view">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="empty-wishlist-icon"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <h2>Your wishlist is empty</h2>
                  <p>
                    Save items you like to your wishlist. Review them anytime
                    and easily move them to the cart.
                  </p>
                  <Link
                    to="/products"
                    className="shop-now-button"
                    style={{textDecoration: 'none'}}
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="products-list">
                  {wishlist.map(product => (
                    <ProductCard productData={product} key={product.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default WishlistView
