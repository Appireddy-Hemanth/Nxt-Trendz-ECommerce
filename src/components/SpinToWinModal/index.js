import {Component} from 'react'
import {BsX} from 'react-icons/bs'
import './index.css'

const PRIZES = [
  {label: '10% OFF', color: '#00f0ff'},
  {label: 'NO LUCK', color: '#1a1a2e'},
  {label: 'FREE SHIP', color: '#a855f7'},
  {label: 'NO LUCK', color: '#1a1a2e'},
  {label: '20% OFF', color: '#fbbf24'},
  {label: 'NO LUCK', color: '#1a1a2e'},
]

class SpinToWinModal extends Component {
  state = {
    isSpinning: false,
    rotation: 0,
    wonPrize: null,
  }

  spinWheel = () => {
    const {isSpinning, wonPrize} = this.state
    if (isSpinning || wonPrize) return

    this.setState({isSpinning: true})

    // Random prize 0-5
    // Ensure we actually win something cool usually (force win for demo)
    const winningIndex = Math.random() > 0.5 ? 0 : 4 // 10% or 20%
    const segmentDegrees = 360 / PRIZES.length

    // Calculate rotation: 5 full spins + degrees to land on winning index
    const extraSpins = 360 * 5
    // To land on index 0 (top), we need 0 deg. Wait, the pointer is at the top.
    // CSS rotation goes clockwise. Index 0 starts at top.
    // If we want index N to be at top, we rotate by 360 - (N * segmentDegrees)
    const targetRotation = extraSpins + (360 - winningIndex * segmentDegrees)

    this.setState({rotation: targetRotation})

    setTimeout(() => {
      this.setState({
        isSpinning: false,
        wonPrize: PRIZES[winningIndex].label,
      })
      this.triggerConfetti()
    }, 4000)
  }

  triggerConfetti = () => {
    // We'll create some CSS confetti elements dynamically
    const container = document.getElementById('spin-confetti-container')
    if (!container) return

    for (let i = 0; i < 50; i += 1) {
      const conf = document.createElement('div')
      conf.className = 'confetti-piece'
      conf.style.left = `${Math.random() * 100}%`
      conf.style.animationDelay = `${Math.random() * 2}s`
      conf.style.backgroundColor = ['#00f0ff', '#a855f7', '#fbbf24', '#ff0055'][
        Math.floor(Math.random() * 4)
      ]
      container.appendChild(conf)
    }
  }

  render() {
    const {onClose} = this.props
    const {rotation, wonPrize, isSpinning} = this.state

    return (
      <div className="spin-modal-overlay">
        <div id="spin-confetti-container" />
        <div className="spin-modal-content">
          <button type="button" className="spin-close-btn" onClick={onClose}>
            <BsX size={28} />
          </button>

          <h2 className="spin-title">Spin & Win!</h2>
          <p className="spin-subtitle">
            Feeling lucky? Spin the wheel for a surprise discount.
          </p>

          <div className="wheel-container">
            <div className="wheel-pointer" />
            <div
              className="wheel"
              style={{
                background: `conic-gradient(
                  #00f0ff 0deg 60deg,
                  #1a1a2e 60deg 120deg,
                  #a855f7 120deg 180deg,
                  #1a1a2e 180deg 240deg,
                  #fbbf24 240deg 300deg,
                  #1a1a2e 300deg 360deg
                )`,
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? 'transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)'
                  : 'none',
              }}
            >
              {PRIZES.map((prize, idx) => {
                // Each segment is 60deg. Center of segment 0 is 30deg.
                // We rotate text by idx * 60 + 30
                const rotationDeg = idx * 60 + 30
                return (
                  <div
                    className="wheel-text-wrapper"
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${prize.label}-${idx}`}
                    style={{
                      transform: `rotate(${rotationDeg}deg) translateY(-85px)`,
                    }}
                  >
                    <span className="segment-text">{prize.label}</span>
                  </div>
                )
              })}
            </div>
            <div className="wheel-center-dot" />
          </div>

          <div className="spin-actions">
            {!wonPrize ? (
              <button
                type="button"
                className={`spin-btn ${isSpinning ? 'disabled' : ''}`}
                onClick={this.spinWheel}
                disabled={isSpinning}
              >
                {isSpinning ? 'SPINNING...' : 'SPIN NOW'}
              </button>
            ) : (
              <div className="prize-announcement">
                <h3>
                  You won: <span className="highlight-prize">{wonPrize}</span>
                </h3>
                <button type="button" className="claim-btn" onClick={onClose}>
                  CLAIM DISCOUNT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default SpinToWinModal
