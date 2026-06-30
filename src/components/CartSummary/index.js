import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import CryptoCheckout from '../CryptoCheckout'

import './index.css'

class CartSummary extends Component {
  state = {
    promoInput: '',
    promoMessage: '',
  }

  handlePromoChange = e => {
    this.setState({promoInput: e.target.value.toUpperCase()})
  }

  applyPromo = (e, applyPromoCode) => {
    e.preventDefault()
    const {promoInput} = this.state
    if (promoInput === 'TRENDZ10') {
      applyPromoCode(10)
      this.setState({promoMessage: '10% Discount Applied!', promoInput: ''})
    } else {
      this.setState({promoMessage: 'Invalid Promo Code'})
    }
  }

  render() {
    const {promoInput, promoMessage} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, discount, applyPromoCode} = value
          let subTotal = 0
          cartList.forEach(eachCartItem => {
            subTotal += eachCartItem.price * eachCartItem.quantity
          })

          const discountAmount = (subTotal * discount) / 100
          const total = subTotal - discountAmount

          return (
            <>
              <div className="cart-summary-container">
                <div className="promo-section">
                  <form
                    className="promo-form"
                    onSubmit={e => this.applyPromo(e, applyPromoCode)}
                  >
                    <input
                      type="text"
                      className="promo-input"
                      placeholder="Enter Promo Code"
                      value={promoInput}
                      onChange={this.handlePromoChange}
                    />
                    <button type="submit" className="promo-btn">
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p
                      className={`promo-msg ${
                        discount > 0 ? 'success' : 'error'
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </div>

                <div className="summary-totals">
                  {discount > 0 && (
                    <p className="discount-value">
                      Discount ({discount}%): -Rs {discountAmount}/-
                    </p>
                  )}
                  <h1 className="order-total-value">
                    <span className="order-total-label">Order Total:</span> Rs{' '}
                    {total}
                    /-
                  </h1>
                  <p className="total-items">{cartList.length} Items in cart</p>
                </div>

                <Link
                  to="/checkout"
                  className="checkout-button d-sm-none"
                  style={{textDecoration: 'none'}}
                >
                  Checkout
                </Link>
                <div className="d-sm-none" style={{width: '100%'}}>
                  <CryptoCheckout totalAmount={total} />
                </div>
              </div>
              <div className="d-lg-none" style={{width: '100%'}}>
                <Link
                  to="/checkout"
                  className="checkout-button"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Checkout
                </Link>
                <CryptoCheckout totalAmount={total} />
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
