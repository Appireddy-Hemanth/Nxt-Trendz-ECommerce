import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

class CheckoutView extends Component {
  state = {
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    isSubmitting: false,
    error: '',
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleCheckout = (e, placeOrder, cartList) => {
    e.preventDefault()
    if (cartList.length === 0) return

    const {name, address, cardNumber, expiry, cvv} = this.state

    if (!name || !address || !cardNumber || !expiry || !cvv) {
      this.setState({error: 'Please fill out all fields.'})
      return
    }

    if (cardNumber.length < 16) {
      this.setState({error: 'Please enter a valid 16-digit card number.'})
      return
    }

    this.setState({isSubmitting: true, error: ''})

    // Simulate API delay
    setTimeout(() => {
      let total = 0
      cartList.forEach(item => {
        total += item.price * item.quantity
      })

      const orderDetails = {
        name,
        address,
        total,
        items: [...cartList],
      }

      placeOrder(orderDetails)

      const {history} = this.props
      history.replace('/order-success')
    }, 1500)
  }

  render() {
    const {
      name,
      address,
      cardNumber,
      expiry,
      cvv,
      isSubmitting,
      error,
    } = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, placeOrder, discount} = value

          let subTotal = 0
          cartList.forEach(item => {
            subTotal += item.price * item.quantity
          })

          const discountAmount = (subTotal * discount) / 100
          const total = subTotal - discountAmount

          if (cartList.length === 0 && !isSubmitting) {
            const {history} = this.props
            history.replace('/cart')
            return null
          }

          return (
            <>
              <Header />
              <div className="checkout-container">
                <div className="checkout-content">
                  <h1 className="checkout-heading">Checkout</h1>

                  <div className="checkout-grid">
                    <div className="checkout-form-section">
                      <form
                        className="checkout-form"
                        onSubmit={e =>
                          this.handleCheckout(e, placeOrder, cartList)
                        }
                      >
                        <div className="form-group">
                          <label htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">Shipping Address</label>
                          <textarea
                            id="address"
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            placeholder="123 Fashion St, NY 10001"
                            rows="3"
                          />
                        </div>

                        <h2 className="payment-heading">Payment Details</h2>

                        <div className="form-group">
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardNumber}
                            onChange={this.handleChange}
                            placeholder="1234 5678 9101 1121"
                            maxLength="16"
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="expiry">Expiry Date</label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              value={expiry}
                              onChange={this.handleChange}
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                          </div>
                          <div className="form-group half">
                            <label htmlFor="cvv">CVV</label>
                            <input
                              type="password"
                              id="cvv"
                              name="cvv"
                              value={cvv}
                              onChange={this.handleChange}
                              placeholder="123"
                              maxLength="3"
                            />
                          </div>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button
                          type="submit"
                          className="place-order-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Processing...' : `Pay Rs ${total}/-`}
                        </button>
                      </form>
                    </div>

                    <div className="checkout-summary-section">
                      <h2>Order Summary</h2>
                      <div className="summary-items">
                        {cartList.map(item => (
                          <div key={item.id} className="summary-item">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="summary-item-img"
                            />
                            <div className="summary-item-details">
                              <p className="summary-item-title">{item.title}</p>
                              <p className="summary-item-qty">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="summary-item-price">
                              Rs {item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="summary-total">
                        {discount > 0 && (
                          <div className="checkout-discount-row">
                            <p>Discount ({discount}%)</p>
                            <p className="checkout-discount-amt">
                              -Rs {discountAmount}/-
                            </p>
                          </div>
                        )}
                        <div className="checkout-total-row">
                          <p>Total</p>
                          <p className="total-amount">Rs {total}/-</p>
                        </div>
                      </div>
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

export default withRouter(CheckoutView)
