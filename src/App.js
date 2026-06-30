import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import CartContext from './context/CartContext'
import WishlistView from './components/WishlistView'
import CheckoutView from './components/CheckoutView'
import OrderSuccessView from './components/OrderSuccessView'
import ProfileView from './components/ProfileView'
import NewsletterModal from './components/NewsletterModal'
import ChatbotWidget from './components/ChatbotWidget'
import SocialProofNotifier from './components/SocialProofNotifier'
import StyleMatcher from './components/StyleMatcher'
import OutfitBuilder from './components/OutfitBuilder'
import DiscoverFeed from './components/DiscoverFeed'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    toasts: [],
    isDarkTheme: true,
    wishlist: [],
    orders: [],
    reviews: {}, // { productId: [ {id, rating, text, date} ] }
    discount: 0,
    showNewsletter: false,
    recentlyViewed: [],
  }

  componentDidMount() {
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter')
    if (!hasSeenNewsletter) {
      this.newsletterTimer = setTimeout(() => {
        this.setState({showNewsletter: true})
      }, 5000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.newsletterTimer)
  }

  closeNewsletter = () => {
    this.setState({showNewsletter: false})
    localStorage.setItem('hasSeenNewsletter', 'true')
  }

  // ---- Toast helpers ----
  showToast = (message, type = 'success') => {
    const id = Date.now()
    this.setState(prev => ({
      toasts: [...prev.toasts, {id, message, type}],
    }))
  }

  dismissToast = id => {
    this.setState(prev => ({
      toasts: prev.toasts.filter(t => t.id !== id),
    }))
  }

  // ---- Cart actions ----
  removeAllCartItems = () => {
    this.setState({cartList: []})
    this.showToast('🗑️ Cart cleared', 'error')
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
    this.showToast('Item removed from cart', 'error')
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            return {
              ...eachCartItem,
              quantity: eachCartItem.quantity + product.quantity,
            }
          }
          return eachCartItem
        }),
      }))
      this.showToast(`⚡ Quantity updated in cart!`)
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
      this.showToast(`⚡ Added to cart!`)
    }
  }

  // ---- Theme actions ----
  toggleTheme = () => {
    this.setState(prev => {
      const newTheme = !prev.isDarkTheme
      if (newTheme) {
        document.body.classList.remove('light-theme')
      } else {
        document.body.classList.add('light-theme')
      }
      return {isDarkTheme: newTheme}
    })
  }

  // ---- Wishlist actions ----
  toggleWishlistItem = product => {
    this.setState(prev => {
      const isWishlisted = prev.wishlist.find(item => item.id === product.id)
      if (isWishlisted) {
        this.showToast('Removed from wishlist', 'error')
        return {wishlist: prev.wishlist.filter(item => item.id !== product.id)}
      }
      this.showToast('Added to wishlist', 'success')
      return {wishlist: [...prev.wishlist, product]}
    })
  }

  // ---- Orders actions ----
  placeOrder = orderDetails => {
    this.setState(prev => ({
      orders: [
        {
          id: `ORD-${Date.now()}`,
          date: new Date().toLocaleDateString(),
          ...orderDetails,
        },
        ...prev.orders,
      ],
      cartList: [], // clear cart
    }))
  }

  // ---- Reviews actions ----
  addReview = (productId, review) => {
    this.setState(prev => ({
      reviews: {
        ...prev.reviews,
        [productId]: [...(prev.reviews[productId] || []), review],
      },
    }))
  }

  // ---- Promo actions ----
  applyPromoCode = discount => {
    this.setState({discount})
  }

  // ---- Recently Viewed actions ----
  addRecentlyViewed = product => {
    this.setState(prev => {
      // Don't add if it's already the most recently viewed
      if (
        prev.recentlyViewed.length > 0 &&
        prev.recentlyViewed[0].id === product.id
      ) {
        return null
      }
      // Remove duplicate if it exists, then unshift
      const filtered = prev.recentlyViewed.filter(p => p.id !== product.id)
      return {
        recentlyViewed: [product, ...filtered].slice(0, 10), // Keep last 10
      }
    })
  }

  render() {
    const {
      cartList,
      toasts,
      isDarkTheme,
      wishlist,
      orders,
      reviews,
      discount,
      showNewsletter,
      recentlyViewed,
    } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,

          isDarkTheme,
          toggleTheme: this.toggleTheme,

          wishlist,
          toggleWishlistItem: this.toggleWishlistItem,

          orders,
          placeOrder: this.placeOrder,

          reviews,
          addReview: this.addReview,

          discount,
          applyPromoCode: this.applyPromoCode,

          recentlyViewed,
          addRecentlyViewed: this.addRecentlyViewed,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/checkout" component={CheckoutView} />
          <ProtectedRoute
            exact
            path="/order-success"
            component={OrderSuccessView}
          />
          <ProtectedRoute exact path="/wishlist" component={WishlistView} />
          <ProtectedRoute exact path="/profile" component={ProfileView} />
          <ProtectedRoute
            exact
            path="/style-matcher"
            component={StyleMatcher}
          />
          <ProtectedRoute
            exact
            path="/outfit-builder"
            component={OutfitBuilder}
          />
          <ProtectedRoute exact path="/discover" component={DiscoverFeed} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>

        {/* Scroll to Top */}
        <ScrollToTop />

        {/* Only show overlays on non-login pages so they don't block login buttons */}
        <Route
          render={({location}) =>
            location.pathname !== '/login' ? (
              <>
                {showNewsletter && (
                  <NewsletterModal onClose={this.closeNewsletter} />
                )}
                <ChatbotWidget />
                <SocialProofNotifier />
              </>
            ) : null
          }
        />

        {/* Toast notifications */}
        <div className="toast-container">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onDismiss={() => this.dismissToast(toast.id)}
            />
          ))}
        </div>
      </CartContext.Provider>
    )
  }
}

export default App
