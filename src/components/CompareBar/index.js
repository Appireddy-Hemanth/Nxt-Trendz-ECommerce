import {Component} from 'react'
import './index.css'

class CompareBar extends Component {
  state = {
    isExpanded: false,
  }

  toggleExpand = () => {
    this.setState(prevState => ({isExpanded: !prevState.isExpanded}))
  }

  render() {
    const {compareList, onRemove} = this.props
    const {isExpanded} = this.state

    if (compareList.length === 0) return null

    return (
      <div className={`compare-bar-container ${isExpanded ? 'expanded' : ''}`}>
        <div
          className="compare-bar-header"
          onClick={this.toggleExpand}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') this.toggleExpand()
          }}
        >
          <div className="compare-bar-title">
            Compare Products ({compareList.length}/3)
          </div>
          <button type="button" className="compare-expand-btn">
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>

        {isExpanded && (
          <div className="compare-bar-body">
            <div className="compare-items-row">
              {compareList.map(item => (
                <div key={item.id} className="compare-item-mini">
                  <button
                    type="button"
                    className="compare-remove-btn"
                    onClick={e => {
                      e.stopPropagation()
                      onRemove(item, false)
                    }}
                  >
                    ×
                  </button>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="compare-item-img"
                  />
                  <p className="compare-item-title">{item.title}</p>
                </div>
              ))}
              {[...Array(3 - compareList.length)].map((_, idx) => {
                const uniqueKey = `empty-${compareList.length}-${idx}`
                return (
                  <div key={uniqueKey} className="compare-item-empty">
                    Add product
                  </div>
                )
              })}
            </div>
            <button
              type="button"
              className="compare-now-btn"
              disabled={compareList.length < 2}
              // eslint-disable-next-line no-alert
              onClick={() => alert('Comparison Modal Coming Soon!')}
            >
              Compare Now
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default CompareBar
