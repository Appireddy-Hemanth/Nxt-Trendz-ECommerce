import {Component} from 'react'
import {FaHeart, FaTimes} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    image:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-denim-jacket.png',
    title: 'Denim Jacket',
    type: 'jacket',
  },
  {
    id: 2,
    image:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-printed-tshirt.png',
    title: 'Printed T-Shirt',
    type: 'tshirt',
  },
  {
    id: 3,
    image:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-joggers.png',
    title: 'Comfort Joggers',
    type: 'pants',
  },
  {
    id: 4,
    image:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-black-tshirt.png',
    title: 'Black T-Shirt',
    type: 'tshirt',
  },
  {
    id: 5,
    image:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png',
    title: 'Winter Hoodie',
    type: 'hoodie',
  },
]

class StyleMatcher extends Component {
  state = {
    cards: [...SAMPLE_PRODUCTS],
    likes: [],
    dislikes: [],
    isFinished: false,
    dragStart: null,
    dragOffset: 0,
  }

  onPointerDown = e => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    this.setState({dragStart: clientX})
  }

  onPointerMove = e => {
    const {dragStart} = this.state
    if (dragStart === null) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    this.setState({dragOffset: clientX - dragStart})
  }

  onPointerUp = () => {
    const {dragOffset} = this.state
    if (dragOffset > 100) {
      this.swipe('right')
    } else if (dragOffset < -100) {
      this.swipe('left')
    } else {
      this.setState({dragStart: null, dragOffset: 0})
    }
  }

  swipe = direction => {
    const {cards, likes, dislikes} = this.state
    if (cards.length === 0) return

    const currentCard = cards[0]
    const remaining = cards.slice(1)

    this.setState({
      dragOffset: direction === 'right' ? 500 : -500, // animate out
    })

    setTimeout(() => {
      this.setState({
        cards: remaining,
        likes: direction === 'right' ? [...likes, currentCard] : likes,
        dislikes: direction === 'left' ? [...dislikes, currentCard] : dislikes,
        dragStart: null,
        dragOffset: 0,
        isFinished: remaining.length === 0,
      })
    }, 300)
  }

  render() {
    const {cards, isFinished, dragOffset, likes} = this.state

    return (
      <>
        <Header />
        <div className="style-matcher-container">
          <div className="style-matcher-content">
            {!isFinished ? (
              <>
                <h2>Find Your Style</h2>
                <p>Swipe Right if you like it, Left if you don&apos;t!</p>
                <div className="card-stack-container">
                  {cards.map((card, index) => {
                    const isTopCard = index === 0
                    const style = isTopCard
                      ? {
                          transform: `translateX(${dragOffset}px) rotate(${
                            dragOffset * 0.05
                          }deg)`,
                          transition:
                            dragOffset === 0 ? 'transform 0.3s' : 'none',
                          zIndex: 10,
                        }
                      : {
                          transform: `scale(${1 - index * 0.05}) translateY(${
                            index * 15
                          }px)`,
                          zIndex: 10 - index,
                        }

                    return (
                      <div
                        key={card.id}
                        className="swipe-card"
                        style={style}
                        onPointerDown={isTopCard ? this.onPointerDown : null}
                        onPointerMove={isTopCard ? this.onPointerMove : null}
                        onPointerUp={isTopCard ? this.onPointerUp : null}
                        onPointerLeave={isTopCard ? this.onPointerUp : null}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          draggable="false"
                        />
                        <div className="card-title">{card.title}</div>
                        {isTopCard && dragOffset > 50 && (
                          <div className="stamp like">LIKE</div>
                        )}
                        {isTopCard && dragOffset < -50 && (
                          <div className="stamp nope">NOPE</div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="swipe-actions">
                  <button
                    type="button"
                    className="action-btn nope"
                    onClick={() => this.swipe('left')}
                  >
                    <FaTimes />
                  </button>
                  <button
                    type="button"
                    className="action-btn like"
                    onClick={() => this.swipe('right')}
                  >
                    <FaHeart />
                  </button>
                </div>
              </>
            ) : (
              <div className="style-matcher-empty">
                <h2>You&apos;ve seen all the products!</h2>
                <p>
                  Check your personalized feed for recommendations based on your
                  matches.
                </p>
                <div className="liked-items-preview">
                  {likes.map(item => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
                <button
                  type="button"
                  className="shop-now-btn"
                  onClick={() => {
                    const {history} = this.props
                    history.push('/products')
                  }}
                >
                  Shop Personalized Feed
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default StyleMatcher
