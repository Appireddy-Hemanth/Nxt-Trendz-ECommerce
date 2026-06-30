import {Component} from 'react'
import {FaMale, FaFemale} from 'react-icons/fa'
import './index.css'

class SizeVisualizer extends Component {
  state = {
    height: 170, // cm
    weight: 65, // kg
    gender: 'male',
  }

  handleHeightChange = e => {
    this.setState({height: parseInt(e.target.value, 10)})
  }

  handleWeightChange = e => {
    this.setState({weight: parseInt(e.target.value, 10)})
  }

  setGender = gender => {
    this.setState({gender})
  }

  getFitRecommendation = () => {
    const {height, weight} = this.state
    const bmi = weight / ((height / 100) * (height / 100))

    if (bmi < 18.5)
      return {size: 'Small (S)', desc: 'Slim fit based on your profile.'}
    if (bmi >= 18.5 && bmi < 24.9)
      return {size: 'Medium (M)', desc: 'Standard fit for your proportions.'}
    if (bmi >= 24.9 && bmi < 29.9)
      return {size: 'Large (L)', desc: 'Relaxed fit recommended.'}
    return {size: 'Extra Large (XL)', desc: 'Comfort fit recommended.'}
  }

  render() {
    const {height, weight, gender} = this.state
    const fit = this.getFitRecommendation()

    // Calculate visual scale. Base height 170cm = 1 scale. Weight 65kg = 1 scaleX
    const scaleY = height / 170
    // Make weight scale a bit more pronounced visually but not totally distorted
    const scaleX = 1 + (weight - 65) * 0.008

    return (
      <div className="size-visualizer-container">
        <h2 className="visualizer-title">Interactive Size Guide</h2>

        <div className="visualizer-content">
          <div className="visualizer-controls">
            <div className="gender-toggle">
              <button
                type="button"
                className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                onClick={() => this.setGender('male')}
              >
                <FaMale />
              </button>
              <button
                type="button"
                className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                onClick={() => this.setGender('female')}
              >
                <FaFemale />
              </button>
            </div>

            <div className="slider-group">
              <label>Height: {height} cm</label>
              <input
                type="range"
                min="140"
                max="210"
                value={height}
                onChange={this.handleHeightChange}
                className="custom-slider"
              />
            </div>

            <div className="slider-group">
              <label>Weight: {weight} kg</label>
              <input
                type="range"
                min="40"
                max="140"
                value={weight}
                onChange={this.handleWeightChange}
                className="custom-slider"
              />
            </div>

            <div className="fit-recommendation">
              <h3>
                Recommended Size: <span>{fit.size}</span>
              </h3>
              <p>{fit.desc}</p>
            </div>
          </div>

          <div className="visualizer-display">
            <div className="silhouette-container">
              {/* CSS Silhouette that scales */}
              <div
                className={`silhouette ${gender}`}
                style={{
                  transform: `scale(${scaleX}, ${scaleY})`,
                  transformOrigin: 'bottom center',
                }}
              >
                <div className="head" />
                <div className="torso">
                  {/* Mock T-Shirt overlay */}
                  <div className="tshirt-overlay" />
                </div>
                <div className="legs" />
              </div>
            </div>
            {/* Grid lines in background for scale reference */}
            <div className="bg-grid" />
          </div>
        </div>
      </div>
    )
  }
}

export default SizeVisualizer
