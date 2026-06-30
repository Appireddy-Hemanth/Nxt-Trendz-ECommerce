import {Component} from 'react'
import {FaBolt, FaUserAlt, FaShoppingBag} from 'react-icons/fa'
import './index.css'

const CITIES = [
  'New York',
  'London',
  'Tokyo',
  'Sydney',
  'Paris',
  'Berlin',
  'Toronto',
  'Dubai',
]
const ITEMS = [
  'a Classic Watch',
  'Retro Sneakers',
  'a Minimalist Backpack',
  'Wireless Earbuds',
  'a Smart Fitness Band',
  'a Denim Jacket',
]
const ACTIONS = [
  {text: 'just bought', icon: <FaShoppingBag size={18} color="#a855f7" />},
  {text: 'added to cart', icon: <FaUserAlt size={18} color="#00f0ff" />},
]

class SocialProofNotifier extends Component {
  state = {
    show: false,
    message: null,
  }

  componentDidMount() {
    this.scheduleNextToast()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    clearTimeout(this.hideTimer)
  }

  scheduleNextToast = () => {
    const nextDelay = Math.random() * 20000 + 15000 // 15 to 35 seconds
    this.timer = setTimeout(() => {
      this.generateToast()
    }, nextDelay)
  }

  generateToast = () => {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)]
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]

    this.setState({
      show: true,
      message: {
        id: Date.now(),
        city,
        item,
        actionText: action.text,
        icon: action.icon,
      },
    })

    this.hideTimer = setTimeout(() => {
      this.setState({show: false})
      this.scheduleNextToast()
    }, 5000) // Show for 5 seconds
  }

  render() {
    const {show, message} = this.state

    if (!show || !message) return null

    return (
      <div className="social-proof-toast">
        <div className="social-proof-icon-wrapper">{message.icon}</div>
        <div className="social-proof-content">
          <p className="social-proof-text">
            <span className="social-proof-bold">Someone in {message.city}</span>{' '}
            {message.actionText}
          </p>
          <p className="social-proof-item">{message.item}</p>
          <div className="social-proof-time">
            <FaBolt size={10} color="#fbbf24" /> Just now
          </div>
        </div>
      </div>
    )
  }
}

export default SocialProofNotifier
