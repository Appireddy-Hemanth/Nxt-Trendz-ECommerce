import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

class RecentlyViewedCarousel extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {recentlyViewed} = value

          if (recentlyViewed.length === 0) return null

          return (
            <div className="recently-viewed-container">
              <h1 className="recently-viewed-heading">Recently Viewed</h1>
              <div className="recently-viewed-scroll">
                {recentlyViewed.map(product => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="recently-viewed-card"
                  >
                    <div className="recent-img-wrapper">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="recent-img"
                      />
                    </div>
                    <div className="recent-details">
                      <p className="recent-title">{product.title}</p>
                      <p className="recent-price">Rs {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RecentlyViewedCarousel
