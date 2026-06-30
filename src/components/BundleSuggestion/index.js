import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

// Mock bundled products that match the general dataset
const mockBundles = [
  {
    id: 111,
    title: 'Minimalist Digital Watch',
    brand: 'Nxt Watches',
    price: 1200,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-smart-watch.png',
    rating: 4.5,
  },
  {
    id: 222,
    title: 'Classic Aviator Sunglasses',
    brand: 'SunBlockers',
    price: 850,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-mixer-grinder.png', // placeholder
    rating: 4.2,
  },
]

class BundleSuggestion extends Component {
  render() {
    const {currentProduct} = this.props

    // Pick a random mock bundle item
    const bundleItem = mockBundles[currentProduct.id % 2 === 0 ? 0 : 1]
    const bundleTotal = currentProduct.price + bundleItem.price

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onAddBothToCart = () => {
            // Add current product (qty 1)
            addCartItem({...currentProduct, quantity: 1})
            // Add bundle product (qty 1)
            addCartItem({...bundleItem, quantity: 1})
          }

          return (
            <div className="bundle-container">
              <h1 className="bundle-heading">Frequently Bought Together</h1>

              <div className="bundle-layout">
                <div className="bundle-items-visual">
                  <div className="bundle-item-card">
                    <img
                      src={currentProduct.imageUrl}
                      alt={currentProduct.title}
                      className="bundle-item-img"
                    />
                    <p className="bundle-item-title">
                      This item: {currentProduct.title}
                    </p>
                    <p className="bundle-item-price">
                      Rs {currentProduct.price}/-
                    </p>
                  </div>

                  <div className="bundle-plus-icon">+</div>

                  <div className="bundle-item-card">
                    <img
                      src={bundleItem.imageUrl}
                      alt={bundleItem.title}
                      className="bundle-item-img"
                    />
                    <p className="bundle-item-title">{bundleItem.title}</p>
                    <p className="bundle-item-price">Rs {bundleItem.price}/-</p>
                  </div>
                </div>

                <div className="bundle-action-section">
                  <p className="bundle-total-label">Bundle Price:</p>
                  <p className="bundle-total-value">Rs {bundleTotal}/-</p>
                  <button
                    type="button"
                    className="add-bundle-btn"
                    onClick={onAddBothToCart}
                  >
                    Add Both to Cart
                  </button>
                  <p className="bundle-savings">
                    Save an extra 5% when bought together (Applied at checkout)
                  </p>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default BundleSuggestion
