import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

class Header extends Component {
  state = {}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getNavLinkClass = path => {
    const {location} = this.props
    return location.pathname === path ? 'nav-link active-nav-link' : 'nav-link'
  }

  renderCartBadge = cartList => {
    const count = cartList.length
    if (count === 0) return null
    return <span className="cart-count-badge">{count}</span>
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, wishlist, isDarkTheme, toggleTheme} = value
          return (
            <nav
              className="nav-header"
              role="navigation"
              aria-label="Main navigation"
            >
              <div className="nav-content">
                {/* ---- Mobile top bar ---- */}
                <div className="nav-bar-mobile-logo-container">
                  <Link to="/" aria-label="Go to home">
                    <img
                      className="website-logo"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                      alt="website logo"
                    />
                  </Link>
                  <button
                    type="button"
                    className="nav-mobile-btn"
                    onClick={this.onClickLogout}
                    aria-label="Logout"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </button>
                </div>

                {/* ---- Desktop bar ---- */}
                <div className="nav-bar-large-container">
                  <Link to="/" aria-label="Go to home">
                    <img
                      className="website-logo"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                      alt="website logo"
                    />
                  </Link>

                  <ul className="nav-menu">
                    <li className="nav-menu-item">
                      <Link
                        to="/"
                        id="nav-home"
                        className={this.getNavLinkClass('/')}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-menu-item">
                      <Link
                        to="/products"
                        id="nav-products"
                        className={this.getNavLinkClass('/products')}
                      >
                        Products
                      </Link>
                    </li>
                    <li className="nav-menu-item">
                      <Link
                        to="/wishlist"
                        id="nav-wishlist"
                        className={this.getNavLinkClass('/wishlist')}
                      >
                        <span className="cart-link-content">
                          Wishlist
                          {this.renderCartBadge(wishlist)}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-menu-item">
                      <Link
                        to="/cart"
                        id="nav-cart"
                        className={this.getNavLinkClass('/cart')}
                      >
                        <span className="cart-link-content">
                          Cart
                          {this.renderCartBadge(cartList)}
                        </span>
                      </Link>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {isDarkTheme ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </button>

                  <Link to="/profile" className="profile-desktop-link">
                    <div className="profile-avatar">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  </Link>

                  <button
                    type="button"
                    id="logout-btn"
                    className="logout-desktop-btn"
                    onClick={this.onClickLogout}
                    title="Logout"
                    aria-label="Logout"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ---- Mobile bottom bar ---- */}
              <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                  <li className="nav-menu-item-mobile">
                    <Link
                      to="/"
                      className={this.getNavLinkClass('/')}
                      aria-label="Home"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <Link
                      to="/products"
                      className={this.getNavLinkClass('/products')}
                      aria-label="Products"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <Link
                      to="/wishlist"
                      className={this.getNavLinkClass('/wishlist')}
                      aria-label="Wishlist"
                    >
                      <span className="mobile-cart-wrapper">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {this.renderCartBadge(wishlist)}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <Link
                      to="/cart"
                      className={this.getNavLinkClass('/cart')}
                      aria-label="Cart"
                    >
                      <span className="mobile-cart-wrapper">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {this.renderCartBadge(cartList)}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <Link
                      to="/profile"
                      className={this.getNavLinkClass('/profile')}
                      aria-label="Profile"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)
