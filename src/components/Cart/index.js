import {useState, useEffect} from 'react'
import CartContext from '../../context/CartContext'

import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import SpinToWinModal from '../SpinToWinModal'

import './index.css'

const Cart = () => {
  const [showSpin, setShowSpin] = useState(false)

  useEffect(() => {
    // Show after 1 second if hasn't spun yet
    const hasSpun = localStorage.getItem('hasSpunWheel')
    if (!hasSpun) {
      const timer = setTimeout(() => {
        setShowSpin(true)
        localStorage.setItem('hasSpunWheel', 'true')
      }, 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        const onClickRemoveAllBtn = () => {
          removeAllCartItems()
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <CartSummary />
                </div>
              )}
              {showSpin && !showEmptyView && (
                <SpinToWinModal onClose={() => setShowSpin(false)} />
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
