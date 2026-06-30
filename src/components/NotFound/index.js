import {Link} from 'react-router-dom'
import MiniGame from '../MiniGame'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-bg">
      <div className="not-found-orb" />
    </div>

    <div className="not-found-content">
      <div className="not-found-code" aria-hidden="true">
        <span className="not-found-code-base" data-text="404">
          404
        </span>
        <span
          className="not-found-code-glitch1"
          aria-hidden="true"
          data-text="404"
        >
          404
        </span>
        <span
          className="not-found-code-glitch2"
          aria-hidden="true"
          data-text="404"
        >
          404
        </span>
      </div>

      <div className="not-found-bolt">⚡</div>

      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        Oops! Looks like this page got struck by lightning and disappeared.
      </p>

      <Link
        to="/"
        id="not-found-home-btn"
        className="not-found-btn"
        style={{textDecoration: 'none'}}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Return to Base
      </Link>

      <div style={{marginTop: '40px', textAlign: 'center'}}>
        <p
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          Or stay and play a game?
        </p>
        <MiniGame />
      </div>
    </div>
  </div>
)

export default NotFound
