import React from 'react'

const CartContext = React.createContext({
  // Cart
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},

  // Theme
  isDarkTheme: true,
  toggleTheme: () => {},

  // Wishlist
  wishlist: [],
  toggleWishlistItem: () => {},

  // Orders
  orders: [],
  placeOrder: () => {},

  // Reviews
  reviews: {}, // { productId: [review1, review2] }
  addReview: () => {},

  // Promotions
  discount: 0,
  applyPromoCode: () => {},

  // Recently Viewed
  recentlyViewed: [],
  addRecentlyViewed: () => {},
})

export default CartContext
