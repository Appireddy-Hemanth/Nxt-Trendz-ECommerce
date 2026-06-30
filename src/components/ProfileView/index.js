import {Component} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

class ProfileView extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {orders} = value

          return (
            <>
              <Header />
              <div className="profile-container">
                <div className="profile-content">
                  <div className="profile-dashboard">
                    {/* User Info Section */}
                    <div className="profile-sidebar">
                      <div className="profile-user-card">
                        <div className="profile-avatar-large">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <h2 className="profile-name">John Doe</h2>
                        <p className="profile-email">john.doe@example.com</p>
                        <div className="profile-stats">
                          <div className="stat">
                            <span className="stat-value">{orders.length}</span>
                            <span className="stat-label">Orders</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">Prime</span>
                            <span className="stat-label">Member</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order History Section */}
                    <div className="profile-main">
                      <h1 className="profile-heading">Order History</h1>

                      {orders.length === 0 ? (
                        <div className="empty-orders-view">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="empty-orders-icon"
                          >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          <h3>No orders yet</h3>
                          <p>
                            Looks like you haven&apos;t made your choice yet.
                          </p>
                        </div>
                      ) : (
                        <div className="orders-list">
                          {orders.map(order => (
                            <div key={order.id} className="order-card">
                              <div className="order-header">
                                <div className="order-meta">
                                  <p className="order-id">Order {order.id}</p>
                                  <p className="order-date">
                                    Placed on {order.date}
                                  </p>
                                </div>
                                <div className="order-status-badge">
                                  Processing
                                </div>
                              </div>

                              <div className="order-items">
                                {order.items.map(item => (
                                  <div key={item.id} className="order-item">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.title}
                                      className="order-item-img"
                                    />
                                    <div className="order-item-details">
                                      <p className="order-item-title">
                                        {item.title}
                                      </p>
                                      <p className="order-item-brand">
                                        by {item.brand}
                                      </p>
                                      <p className="order-item-qty">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <div className="order-item-price">
                                      Rs {item.price * item.quantity}/-
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="order-footer">
                                <p className="order-total-label">
                                  Total Amount:
                                </p>
                                <p className="order-total-value">
                                  Rs {order.total}/-
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default ProfileView
