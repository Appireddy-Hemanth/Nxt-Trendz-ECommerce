import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const OrderSuccessView = () => (
  <>
    <Header />
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon-wrapper">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-icon"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="success-heading">Order Placed Successfully!</h1>
        <p className="success-desc">
          Thank you for shopping with Nxt Trendz. Your order has been placed and
          is being processed. You can track your order status in your profile.
        </p>

        <div className="success-actions">
          <Link to="/products" className="success-btn secondary">
            Continue Shopping
          </Link>
          <Link to="/profile" className="success-btn primary">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default OrderSuccessView
