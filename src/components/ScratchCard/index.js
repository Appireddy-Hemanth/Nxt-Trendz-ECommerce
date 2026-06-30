import {Component, createRef} from 'react'
import './index.css'

class ScratchCard extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = createRef()
    this.containerRef = createRef()
    this.state = {
      isDrawing: false,
      isRevealed: false,
    }
  }

  componentDidMount() {
    this.initCanvas()
    // Handle resize
    window.addEventListener('resize', this.initCanvas)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.initCanvas)
  }

  initCanvas = () => {
    const canvas = this.canvasRef.current
    const container = this.containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const {width, height} = container.getBoundingClientRect()

    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Fill with silver color
    ctx.fillStyle = '#c0c0c0'
    ctx.fillRect(0, 0, width, height)

    // Add some scratch card texture
    ctx.font = 'bold 20px "Inter"'
    ctx.fillStyle = '#a0a0a0'
    ctx.textAlign = 'center'
    ctx.fillText('SCRATCH HERE', width / 2, height / 2 + 7)

    // Reset state
    this.setState({isRevealed: false})
  }

  getPointerPos = e => {
    const canvas = this.canvasRef.current
    const rect = canvas.getBoundingClientRect()
    let clientX
    let clientY

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  handlePointerDown = e => {
    const {isRevealed} = this.state
    if (isRevealed) return
    this.setState({isDrawing: true})

    // Prevent scrolling on touch
    if (e.type === 'touchstart') e.preventDefault()

    this.scratch(e)
  }

  handlePointerMove = e => {
    const {isDrawing, isRevealed} = this.state
    if (!isDrawing || isRevealed) return

    // Prevent scrolling on touch
    if (e.type === 'touchmove') e.preventDefault()

    this.scratch(e)
  }

  handlePointerUp = () => {
    this.setState({isDrawing: false})
    this.checkReveal()
  }

  scratch = e => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = this.getPointerPos(e)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2, false)
    ctx.fill()
  }

  checkReveal = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    const {width, height} = canvas

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data

    let transparentPixels = 0
    // Check every 4th byte (alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels += 1
      }
    }

    const totalPixels = pixels.length / 4
    const percentRevealed = (transparentPixels / totalPixels) * 100
    const {isRevealed} = this.state

    if (percentRevealed > 40 && !isRevealed) {
      this.setState({isRevealed: true})

      // Clear the rest
      ctx.clearRect(0, 0, width, height)
    }
  }

  render() {
    const {promoCode = 'NXTUNIQUE25', discountText = '25% OFF'} = this.props
    const {isRevealed} = this.state

    return (
      <div className="scratch-card-wrapper" ref={this.containerRef}>
        <div className="scratch-card-secret">
          <div className="secret-content">
            <span className="secret-discount">{discountText}</span>
            <span className="secret-code">Code: {promoCode}</span>
          </div>
        </div>
        <canvas
          ref={this.canvasRef}
          className={`scratch-canvas ${isRevealed ? 'revealed' : ''}`}
          onMouseDown={this.handlePointerDown}
          onMouseMove={this.handlePointerMove}
          onMouseUp={this.handlePointerUp}
          onMouseLeave={this.handlePointerUp}
          onTouchStart={this.handlePointerDown}
          onTouchMove={this.handlePointerMove}
          onTouchEnd={this.handlePointerUp}
        />
      </div>
    )
  }
}

export default ScratchCard
