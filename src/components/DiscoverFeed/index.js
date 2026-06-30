import {Component} from 'react'
import {FaHeart, FaShare, FaShoppingCart, FaComment} from 'react-icons/fa'
import Header from '../Header'
import {playPopSound} from '../../utils/haptics'
import './index.css'

const MOCK_VIDEOS = [
  {
    id: 'v1',
    url:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-joggers.png', // We use images and animate them as mock videos
    user: '@fashion_guru',
    description: 'Styling the ultimate comfort joggers! 🔥 #ootd #style',
    likes: '12.4K',
    comments: '342',
    product: {id: 3, name: 'Comfort Joggers', price: '₹1299'},
  },
  {
    id: 'v2',
    url:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-denim-jacket.png',
    user: '@trendsetter',
    description: 'Denim on denim is back baby. Get the look. 🧥✨',
    likes: '8.1K',
    comments: '120',
    product: {id: 1, name: 'Denim Jacket', price: '₹1999'},
  },
  {
    id: 'v3',
    url:
      'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png',
    user: '@streetwear_daily',
    description: 'Winter essentials dropping now. Cop or drop? ❄️',
    likes: '45.2K',
    comments: '1.2K',
    product: {id: 5, name: 'Winter Hoodie', price: '₹1499'},
  },
]

class DiscoverFeed extends Component {
  state = {
    likedVideos: {},
  }

  toggleLike = id => {
    playPopSound()
    this.setState(prev => ({
      likedVideos: {...prev.likedVideos, [id]: !prev.likedVideos[id]},
    }))
  }

  buyNow = productId => {
    const {history} = this.props
    // In real app, adds to cart. Here we redirect to product page
    history.push(`/products/${productId}`)
  }

  render() {
    const {likedVideos} = this.state

    return (
      <div className="discover-feed-wrapper">
        <Header />
        <div className="discover-scroll-container">
          {MOCK_VIDEOS.map(video => (
            <div key={video.id} className="discover-video-container">
              {/* Fake video background using animated image */}
              <div className="mock-video-bg">
                <img
                  src={video.url}
                  alt="Video content"
                  className="animated-video-img"
                />
              </div>

              <div className="video-overlay-ui">
                <div className="video-info">
                  <h3>{video.user}</h3>
                  <p>{video.description}</p>

                  <div className="video-product-card">
                    <img src={video.url} alt="Product Thumbnail" />
                    <div className="vpc-details">
                      <h4>{video.product.name}</h4>
                      <span>{video.product.price}</span>
                    </div>
                    <button
                      type="button"
                      className="vpc-buy-btn"
                      onClick={() => this.buyNow(video.product.id)}
                    >
                      <FaShoppingCart /> Buy
                    </button>
                  </div>
                </div>

                <div className="video-actions">
                  <button
                    type="button"
                    className={`action-icon ${
                      likedVideos[video.id] ? 'liked' : ''
                    }`}
                    onClick={() => this.toggleLike(video.id)}
                  >
                    <FaHeart />
                    <span>{video.likes}</span>
                  </button>
                  <button type="button" className="action-icon">
                    <FaComment />
                    <span>{video.comments}</span>
                  </button>
                  <button type="button" className="action-icon">
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default DiscoverFeed
