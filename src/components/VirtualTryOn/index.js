import {Component, createRef} from 'react'
import {FaCamera, FaTimes, FaCameraRetro} from 'react-icons/fa'
import './index.css'

class VirtualTryOn extends Component {
  state = {
    isOpen: false,
    hasCameraAccess: false,
    error: null,
    overlayPos: {x: 100, y: 100},
    overlayScale: 1,
    isDragging: false,
  }

  constructor(props) {
    super(props)
    this.videoRef = createRef()
    this.dragStart = {x: 0, y: 0}
  }

  componentWillUnmount() {
    this.stopCamera()
  }

  openModal = async () => {
    this.setState({isOpen: true, error: null})
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true})
      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream
      }
      this.setState({hasCameraAccess: true})
    } catch (err) {
      this.setState({error: 'Camera access denied or unavailable.'})
    }
  }

  closeModal = () => {
    this.setState({isOpen: false})
    this.stopCamera()
  }

  stopCamera = () => {
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      this.videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      this.videoRef.current.srcObject = null
    }
    this.setState({hasCameraAccess: false})
  }

  takeSnapshot = () => {
    // In a real app, this would draw the video + overlay to a canvas    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-alert
    alert('Snapshot taken and saved!')
  }

  // Dragging logic for the overlay
  onPointerDown = e => {
    const {overlayPos} = this.state
    this.setState({isDragging: true})
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    this.dragStart = {
      x: clientX - overlayPos.x,
      y: clientY - overlayPos.y,
    }
  }

  onPointerMove = e => {
    const {isDragging} = this.state
    if (!isDragging) return
    e.preventDefault() // prevent scrolling
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    this.setState({
      overlayPos: {
        x: clientX - this.dragStart.x,
        y: clientY - this.dragStart.y,
      },
    })
  }

  onPointerUp = () => {
    this.setState({isDragging: false})
  }

  handleScale = e => {
    this.setState({overlayScale: parseFloat(e.target.value)})
  }

  render() {
    const {
      isOpen,
      hasCameraAccess,
      error,
      overlayPos,
      overlayScale,
    } = this.state
    const {productImage} = this.props

    return (
      <>
        <button
          type="button"
          className="virtual-try-on-btn"
          onClick={this.openModal}
        >
          <FaCameraRetro /> Virtual Try-On
        </button>

        {isOpen && (
          <div className="vto-modal-overlay">
            <div className="vto-modal-content">
              <button
                type="button"
                className="vto-close-btn"
                onClick={this.closeModal}
              >
                <FaTimes />
              </button>

              <h2>AR Virtual Try-On</h2>

              <div className="vto-viewport">
                {!hasCameraAccess && !error && (
                  <div className="vto-loading">Requesting Camera...</div>
                )}
                {error && <div className="vto-error">{error}</div>}
                <video
                  ref={this.videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="vto-video"
                />

                {hasCameraAccess && (
                  <div
                    className="vto-overlay-container"
                    style={{
                      transform: `translate(${overlayPos.x}px, ${overlayPos.y}px) scale(${overlayScale})`,
                    }}
                    onPointerDown={this.onPointerDown}
                    onPointerMove={this.onPointerMove}
                    onPointerUp={this.onPointerUp}
                    onPointerLeave={this.onPointerUp}
                  >
                    <img
                      src={productImage}
                      alt="Try On"
                      className="vto-overlay-img"
                      draggable="false"
                    />
                  </div>
                )}
              </div>

              {hasCameraAccess && (
                <div className="vto-controls">
                  <div className="scale-control">
                    <label htmlFor="scaleInput">Size</label>
                    <input
                      id="scaleInput"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={overlayScale}
                      onChange={this.handleScale}
                    />
                  </div>
                  <button
                    type="button"
                    className="snapshot-btn"
                    onClick={this.takeSnapshot}
                  >
                    <FaCamera /> Snapshot
                  </button>
                  <p className="vto-hint">
                    Drag the item to position it over your body.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default VirtualTryOn
