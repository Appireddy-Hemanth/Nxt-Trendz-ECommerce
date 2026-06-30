import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
    isLoading: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg, isLoading: false})
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({isLoading: true, showSubmitError: false})
    const {username, password} = this.state
    
    // Intercept mock credentials for 'Hemanth'
    let apiUsername = username
    let apiPassword = password
    
    if (username === 'Hemanth' && password === '123456') {
      apiUsername = 'rahul'
      apiPassword = 'rahul@2021'
    }

    const userDetails = {username: apiUsername, password: apiPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (e) {
      this.onSubmitFailure('Network error. Please try again.')
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={this.toggleShowPassword}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="username"
            className="input-field"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Enter your username"
          />
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg, isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        {/* Animated background */}
        <div className="login-bg">
          <div className="login-bg-orb orb-1" />
          <div className="login-bg-orb orb-2" />
          <div className="login-bg-orb orb-3" />
          {/* Lightning bolts */}
          <svg
            className="lightning-svg bolt-1"
            viewBox="0 0 60 200"
            fill="none"
          >
            <polyline
              points="35,0 10,90 28,90 5,200"
              stroke="#00f0ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              className="bolt-path"
            />
          </svg>
          <svg
            className="lightning-svg bolt-2"
            viewBox="0 0 60 200"
            fill="none"
          >
            <polyline
              points="40,0 15,80 32,80 8,200"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              className="bolt-path"
            />
          </svg>
          <svg
            className="lightning-svg bolt-3"
            viewBox="0 0 60 200"
            fill="none"
          >
            <polyline
              points="30,0 8,70 22,70 2,180"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              className="bolt-path"
            />
          </svg>
          {/* Particles */}
          <div className="particle p1" />
          <div className="particle p2" />
          <div className="particle p3" />
          <div className="particle p4" />
          <div className="particle p5" />
          <div className="particle p6" />
        </div>

        <div className="login-form-container">
          {/* Left side: illustration */}
          <div className="login-illustration-side">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="login-logo-mobile"
              alt="website logo"
            />
            <div className="login-illustration-wrapper">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-image"
                alt="website login"
              />
              <div className="illustration-glow" />
            </div>
            <div className="login-tagline">
              <h2 className="login-tagline-text">
                Style meets
                <span className="gradient-text"> Lightning</span>
              </h2>
              <p className="login-tagline-sub">
                Shop the latest trends at electrifying prices
              </p>
            </div>
          </div>

          {/* Right side: form */}
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="form-header">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="login-website-logo-desktop-image"
                alt="website logo"
              />
              <h1 className="form-title">Welcome Back</h1>
              <p className="form-subtitle">Sign in to continue shopping</p>
            </div>

            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            <button
              type="submit"
              id="login-submit-btn"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <svg
                    className="btn-lightning"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Sign In
                </>
              )}
            </button>

            {showSubmitError && (
              <p className="error-message" role="alert">
                ⚡ {errorMsg}
              </p>
            )}

            <p className="login-hint">
              Use: <span className="login-hint-cred">Hemanth</span> /{' '}
              <span className="login-hint-cred">123456</span>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
