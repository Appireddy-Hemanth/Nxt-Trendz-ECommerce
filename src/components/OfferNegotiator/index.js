import {Component} from 'react'
import {FaRobot, FaTimes, FaHandshake} from 'react-icons/fa'
import './index.css'

class OfferNegotiator extends Component {
  state = {
    isOpen: false,
    userOffer: '',
    negotiationState: 'idle', // idle, thinking, counter, accepted, rejected
    botMessage:
      "Hi! I'm the AI Negotiator. Make me a reasonable offer, and we might just have a deal.",
    finalPrice: null,
  }

  // The hidden bottom line is 75% of original price
  getBottomLine = () => {
    const {originalPrice} = this.props
    return originalPrice * 0.75
  }

  openModal = () =>
    this.setState({isOpen: true, negotiationState: 'idle', userOffer: ''})

  closeModal = () => this.setState({isOpen: false})

  handleOfferChange = e => {
    this.setState({userOffer: e.target.value})
  }

  submitOffer = () => {
    const {userOffer} = this.state
    const {originalPrice} = this.props
    const offer = parseInt(userOffer, 10)

    if (Number.isNaN(offer) || offer <= 0) return

    this.setState({
      negotiationState: 'thinking',
      botMessage: 'Let me check with my manager...',
    })

    setTimeout(() => {
      const bottomLine = this.getBottomLine()

      if (offer >= originalPrice) {
        this.setState({
          negotiationState: 'accepted',
          finalPrice: offer,
          botMessage: 'Wow, you offered full price or more! Deal!',
        })
      } else if (offer >= bottomLine * 1.1) {
        this.setState({
          negotiationState: 'accepted',
          finalPrice: offer,
          botMessage: `I can accept ₹${offer}. You've got yourself a deal!`,
        })
      } else if (offer >= bottomLine) {
        // Counter offer
        const counter = Math.floor((offer + originalPrice) / 2)
        this.setState({
          negotiationState: 'counter',
          finalPrice: counter,
          botMessage: `₹${offer} is a bit too low. I can do ₹${counter}. Deal?`,
        })
      } else {
        this.setState({
          negotiationState: 'rejected',
          botMessage: `Sorry, ₹${offer} is way below our cost. We can't do that.`,
        })
      }
    }, 1500)
  }

  acceptCounter = () => {
    const {finalPrice} = this.state
    this.setState({
      negotiationState: 'accepted',
      botMessage: `Awesome! You got it for ₹${finalPrice}.`,
    })
  }

  addToCartWithOffer = () => {
    const {onAddToCartWithOffer} = this.props
    const {finalPrice} = this.state
    onAddToCartWithOffer(finalPrice)
    this.closeModal()
  }

  render() {
    const {
      isOpen,
      userOffer,
      negotiationState,
      botMessage,
      finalPrice,
    } = this.state
    const {originalPrice} = this.props

    return (
      <>
        <button
          type="button"
          className="make-offer-trigger-btn"
          onClick={this.openModal}
        >
          <FaHandshake /> Make an Offer
        </button>

        {isOpen && (
          <div className="offer-modal-overlay">
            <div className="offer-modal-content">
              <button
                type="button"
                className="offer-close-btn"
                onClick={this.closeModal}
              >
                <FaTimes />
              </button>

              <div className="offer-header">
                <FaRobot className="offer-robot-icon" />
                <h2>AI Negotiator</h2>
              </div>

              <div className="offer-price-tag">
                Original Price: <span>₹{originalPrice}</span>
              </div>

              <div className={`offer-chat-bubble ${negotiationState}`}>
                {negotiationState === 'thinking' ? (
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                ) : (
                  <p>{botMessage}</p>
                )}
              </div>

              {negotiationState === 'idle' ||
              negotiationState === 'rejected' ? (
                <div className="offer-input-section">
                  <div className="offer-input-wrapper">
                    <span>₹</span>
                    <input
                      type="number"
                      value={userOffer}
                      onChange={this.handleOfferChange}
                      placeholder="Enter your price"
                    />
                  </div>
                  <button
                    type="button"
                    className="submit-offer-btn"
                    onClick={this.submitOffer}
                  >
                    Submit Offer
                  </button>
                </div>
              ) : null}

              {negotiationState === 'counter' && (
                <div className="offer-counter-actions">
                  <button
                    type="button"
                    className="accept-counter-btn"
                    onClick={this.acceptCounter}
                  >
                    Accept ₹{finalPrice}
                  </button>
                  <button
                    type="button"
                    className="reject-counter-btn"
                    onClick={() => this.setState({negotiationState: 'idle'})}
                  >
                    Make another offer
                  </button>
                </div>
              )}

              {negotiationState === 'accepted' && (
                <button
                  type="button"
                  className="add-deal-to-cart-btn"
                  onClick={this.addToCartWithOffer}
                >
                  Add to Cart at ₹{finalPrice}
                </button>
              )}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default OfferNegotiator
