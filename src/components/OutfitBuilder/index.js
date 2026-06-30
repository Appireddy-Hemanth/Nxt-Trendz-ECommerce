import {Component} from 'react'
import {FaTshirt, FaUndo, FaShoppingCart} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const INVENTORY = {
  tops: [
    {
      id: 't1',
      type: 'top',
      src:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-printed-tshirt.png',
      price: 999,
    },
    {
      id: 't2',
      type: 'top',
      src:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-black-tshirt.png',
      price: 899,
    },
    {
      id: 't3',
      type: 'top',
      src:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png',
      price: 1499,
    },
  ],
  bottoms: [
    {
      id: 'b1',
      type: 'bottom',
      src:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-joggers.png',
      price: 1299,
    },
    // We'd ideally have more specific bottom images, reusing what we have
    {
      id: 'b2',
      type: 'bottom',
      src:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-denim-jacket.png',
      price: 1999,
    }, // Pretend it's jeans
  ],
}

class OutfitBuilder extends Component {
  state = {
    canvasItems: [],
    draggedItem: null,
  }

  handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item.id)
    this.setState({draggedItem: item})
  }

  handleDragOver = e => {
    e.preventDefault() // Necessary to allow dropping
  }

  handleDrop = e => {
    e.preventDefault()
    const {draggedItem, canvasItems} = this.state
    if (!draggedItem) return

    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left - 50 // center roughly
    const y = e.clientY - rect.top - 50

    this.setState({
      canvasItems: [
        ...canvasItems,
        {...draggedItem, x, y, uniqueId: Date.now()},
      ],
      draggedItem: null,
    })
  }

  clearCanvas = () => {
    this.setState({canvasItems: []})
  }

  addToCart = () => {
    const {history} = this.props
    // eslint-disable-next-line no-alert
    alert('Outfit added to cart! (Mock)')
    history.push('/cart')
  }

  render() {
    const {canvasItems} = this.state
    const totalPrice = canvasItems.reduce((acc, item) => acc + item.price, 0)

    return (
      <>
        <Header />
        <div className="outfit-builder-container">
          <div className="builder-header">
            <FaTshirt className="builder-icon" />
            <h1>Interactive Outfit Builder</h1>
            <p>
              Drag items from the inventory onto the canvas to build your look.
            </p>
          </div>

          <div className="builder-workspace">
            <div className="inventory-panel">
              <h3>Tops</h3>
              <div className="inventory-grid">
                {INVENTORY.tops.map(item => (
                  <div
                    key={item.id}
                    className="inventory-item"
                    draggable
                    onDragStart={e => this.handleDragStart(e, item)}
                  >
                    <img src={item.src} alt="Top" draggable="false" />
                  </div>
                ))}
              </div>

              <h3>Bottoms</h3>
              <div className="inventory-grid">
                {INVENTORY.bottoms.map(item => (
                  <div
                    key={item.id}
                    className="inventory-item"
                    draggable
                    onDragStart={e => this.handleDragStart(e, item)}
                  >
                    <img src={item.src} alt="Bottom" draggable="false" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="builder-canvas"
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
            >
              {canvasItems.length === 0 && (
                <div className="canvas-placeholder">Drop items here</div>
              )}
              {canvasItems.map(item => (
                <div
                  key={item.uniqueId}
                  className="canvas-item"
                  style={{left: item.x, top: item.y}}
                >
                  <img src={item.src} alt="Outfit Item" />
                </div>
              ))}
            </div>

            <div className="outfit-summary-panel">
              <h3>Outfit Summary</h3>
              {canvasItems.length === 0 ? (
                <p className="empty-summary">Your canvas is empty.</p>
              ) : (
                <ul className="summary-list">
                  {canvasItems.map(item => (
                    <li key={item.uniqueId}>
                      <span>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-actions">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={this.clearCanvas}
                >
                  <FaUndo /> Clear
                </button>
                <button
                  type="button"
                  className="btn-add-outfit"
                  onClick={this.addToCart}
                  disabled={canvasItems.length === 0}
                >
                  <FaShoppingCart /> Buy Outfit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default OutfitBuilder
