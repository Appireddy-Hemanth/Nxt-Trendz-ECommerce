import {Component} from 'react'
import './index.css'

class NewsletterModal extends Component {
  state = {
    email: '',
    isSubscribed: false,
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value})
  }

  handleSubscribe = e => {
    e.preventDefault()
    const {email} = this.state
    if (!email.trim()) {
      // If empty, just close it or show an error. Let's just close it to be user friendly
      const {onClose} = this.props
      onClose()
      return
    }
    this.setState({isSubscribed: true})

    // Auto close after 2 seconds
    setTimeout(() => {
      const {onClose} = this.props
      onClose()
    }, 2000)
  }

  render() {
    const {onClose} = this.props
    const {email, isSubscribed} = this.state

    return (
      <div
        className="newsletter-overlay"
        onClick={onClose}
        role="button"
        tabIndex="0"
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
      >
        <div
          className="newsletter-modal"
          onClick={e => e.stopPropagation()}
          role="button"
          tabIndex="-1"
          onKeyDown={e => e.stopPropagation()}
        >
          <button
            type="button"
            className="newsletter-close-btn"
            onClick={onClose}
            aria-label="Close Newsletter"
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

          {!isSubscribed ? (
            <>
              <div className="newsletter-icon">💌</div>
              <h2 className="newsletter-heading">Unlock 15% Off!</h2>
              <p className="newsletter-desc">
                Subscribe to our newsletter and get exclusive offers, new
                arrivals, and style tips delivered straight to your inbox.
              </p>
              <form className="newsletter-form" onSubmit={this.handleSubscribe}>
                <label htmlFor="newsletterEmail" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletterEmail"
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.handleEmailChange}
                  required
                />
                <button type="submit" className="newsletter-submit-btn">
                  Subscribe & Get 15% Off
                </button>
              </form>
              <button
                type="button"
                className="newsletter-no-thanks"
                onClick={onClose}
              >
                No thanks, I&apos;ll pay full price
              </button>
            </>
          ) : (
            <div className="newsletter-success">
              <div className="success-icon">✨</div>
              <h2 className="newsletter-heading">You&apos;re on the list!</h2>
              <p className="newsletter-desc">
                Use code <strong>WELCOME15</strong> at checkout for 15% off your
                first order.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default NewsletterModal
