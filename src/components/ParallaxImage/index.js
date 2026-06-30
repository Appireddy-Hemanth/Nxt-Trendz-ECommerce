import {Component} from 'react'
import {FaCube} from 'react-icons/fa'
import './index.css'

class ParallaxImage extends Component {
  state = {
    rotateX: 0,
    rotateY: 0,
    isHovered: false,
  }

  handleMouseMove = e => {
    if (!this.containerRef) return

    const {left, top, width, height} = this.containerRef.getBoundingClientRect()
    // Calculate mouse position relative to center of container
    const x = e.clientX - left - width / 2
    const y = e.clientY - top - height / 2

    // Max rotation in degrees
    const maxRotation = 15

    // Normalize coordinates (-1 to 1) and calculate rotation
    const rotateY = (x / (width / 2)) * maxRotation
    const rotateX = -(y / (height / 2)) * maxRotation // Invert Y axis

    this.setState({rotateX, rotateY})
  }

  handleMouseEnter = () => {
    this.setState({isHovered: true})
  }

  handleMouseLeave = () => {
    this.setState({isHovered: false, rotateX: 0, rotateY: 0})
  }

  setRef = node => {
    this.containerRef = node
  }

  render() {
    const {src, alt, className} = this.props
    const {rotateX, rotateY, isHovered} = this.state

    return (
      <div
        className="parallax-container"
        ref={this.setRef}
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="parallax-badge">
          <FaCube size={24} />
          <span>Interactive 3D</span>
        </div>
        <div
          className="parallax-inner"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
              isHovered ? 1.05 : 1
            })`,
            transition: isHovered
              ? 'transform 0.1s ease-out'
              : 'transform 0.5s ease-out',
          }}
        >
          <img
            src={src}
            alt={alt}
            className={`parallax-img ${className || ''}`}
          />

          {/* Glare effect */}
          {isHovered && (
            <div
              className="parallax-glare"
              style={{
                transform: `translate(${rotateY * 2}px, ${-rotateX * 2}px)`,
                opacity: 0.3 + Math.abs(rotateX + rotateY) / 100,
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ParallaxImage
