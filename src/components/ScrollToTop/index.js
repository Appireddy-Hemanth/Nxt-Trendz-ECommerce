import {Component} from 'react'
import './index.css'

class ScrollToTop extends Component {
  state = {visible: false}

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({visible: window.scrollY > 300})
  }

  scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  render() {
    const {visible} = this.state
    return (
      <button
        type="button"
        id="scroll-to-top-btn"
        className={`scroll-to-top-btn ${visible ? 'visible' : ''}`}
        onClick={this.scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </button>
    )
  }
}

export default ScrollToTop
