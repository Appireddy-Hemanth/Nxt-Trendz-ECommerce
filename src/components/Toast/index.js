import {Component} from 'react'
import './index.css'

class Toast extends Component {
  componentDidMount() {
    const {duration, onDismiss} = this.props
    this.timer = setTimeout(onDismiss, duration || 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const {message, type, onDismiss} = this.props
    return (
      <div className={`toast toast-${type || 'success'}`} role="alert">
        <div className="toast-icon">
          {type === 'error' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          )}
        </div>
        <p className="toast-message">{message}</p>
        <button
          type="button"
          className="toast-close"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="toast-progress" />
      </div>
    )
  }
}

export default Toast
