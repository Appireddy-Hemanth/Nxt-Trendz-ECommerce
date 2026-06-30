import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import PromoBanner from '../PromoBanner'
import RecentlyViewedCarousel from '../RecentlyViewedCarousel'
import ScratchCard from '../ScratchCard'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <PromoBanner />
      <Header />
      <div className="home-page">
        {/* Animated background */}
        <div className="home-bg">
          <div className="home-orb home-orb-1" />
          <div className="home-orb home-orb-2" />
          <div className="home-orb home-orb-3" />
          {/* Lightning bolts */}
          <svg className="home-bolt hb-1" viewBox="0 0 60 220" fill="none">
            <polyline
              points="38,0 12,100 30,100 6,220"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
          <svg className="home-bolt hb-2" viewBox="0 0 60 220" fill="none">
            <polyline
              points="42,0 16,90 34,90 8,220"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </svg>
          <svg className="home-bolt hb-3" viewBox="0 0 60 220" fill="none">
            <polyline
              points="35,0 10,95 28,95 5,220"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </svg>
          {/* Grid lines */}
          <div className="home-grid" />
          {/* Particles */}
          <div className="home-particle hp1" />
          <div className="home-particle hp2" />
          <div className="home-particle hp3" />
          <div className="home-particle hp4" />
          <div className="home-particle hp5" />
        </div>

        <div className="home-container">
          {/* Left: content */}
          <div className="home-content">
            <div className="home-badge">
              <span className="home-badge-dot" />
              New Season 2026 Collection
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
              alt="clothes that get you noticed"
              className="home-mobile-img"
            />

            <h1 className="home-heading">
              Clothes That Get
              <span className="home-heading-accent"> YOU Noticed</span>
              <span className="home-heading-lightning">⚡</span>
            </h1>

            <p className="home-description">
              Fashion is part of the daily air and it does not quite help that
              it changes all the time. Clothes have always been a marker of the
              era and we are in a revolution. Your fashion makes you been seen
              and heard that way you are. So, celebrate the seasons new and
              exciting fashion in your own way.
            </p>

            <div className="home-cta-row">
              <Link
                to="/products"
                id="home-shop-btn"
                className="shop-now-button"
                style={{textDecoration: 'none'}}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Shop Now
              </Link>
              <Link to="/products" className="home-explore-link">
                Explore All →
              </Link>
            </div>

            <div className="home-stats">
              <div className="home-stat">
                <span className="home-stat-value">10K+</span>
                <span className="home-stat-label">Products</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-value">500+</span>
                <span className="home-stat-label">Brands</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-value">4.9★</span>
                <span className="home-stat-label">Rating</span>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="home-image-side">
            <div className="home-image-glow" />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
              alt="clothes that get you noticed"
              className="home-desktop-img"
            />

            {/* Unique Scratch Card */}
            <div className="home-scratch-wrapper">
              <ScratchCard promoCode="NXTUNIQUE25" discountText="25% OFF" />
            </div>
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="home-ticker">
          <div className="home-ticker-track">
            {[
              'TRENDING NOW',
              'SUMMER SALE',
              'NEW ARRIVALS',
              'EXCLUSIVE DEALS',
              'FREE SHIPPING',
              'TOP BRANDS',
              'TRENDING NOW',
              'SUMMER SALE',
              'NEW ARRIVALS',
              'EXCLUSIVE DEALS',
              'FREE SHIPPING',
              'TOP BRANDS',
            ].map((label, i) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <span key={i} className="home-ticker-item">
                <span className="home-ticker-dot">⚡</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <RecentlyViewedCarousel />
      </div>
    </>
  )
}

export default Home
