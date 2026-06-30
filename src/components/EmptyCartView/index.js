import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="cart-empty-image"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

    <Link
      to="/products"
      className="shop-now-btn"
      style={{textDecoration: 'none'}}
    >
      Shop Now
    </Link>
  </div>
)

export default EmptyCartView
