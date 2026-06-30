// eslint-disable-next-line import/prefer-default-export
import {playTransitionSound, playPopSound} from './haptics'

// eslint-disable-next-line import/prefer-default-export
export const flyToCart = (event, imageUrl) => {
  const {clientX, clientY} = event

  playTransitionSound()

  // Create flying image
  const flyingImg = document.createElement('img')
  flyingImg.src = imageUrl
  flyingImg.className = 'fly-to-cart-img'

  // Start position
  flyingImg.style.left = `${clientX - 25}px`
  flyingImg.style.top = `${clientY - 25}px`

  document.body.appendChild(flyingImg)

  // Find the cart icon position
  const cartIcon = document.querySelector(
    '.nav-cart-link, .nav-item-mobile-link[href="/cart"]',
  )
  let targetX = window.innerWidth - 50 // Default top right
  let targetY = 30 // Default top

  if (cartIcon) {
    const rect = cartIcon.getBoundingClientRect()
    targetX = rect.left + rect.width / 2 - 10
    targetY = rect.top + rect.height / 2 - 10
  }

  // Animate
  setTimeout(() => {
    flyingImg.style.left = `${targetX}px`
    flyingImg.style.top = `${targetY}px`
    flyingImg.style.transform = 'scale(0.1)'
    flyingImg.style.opacity = '0.5'
  }, 10) // Small delay to allow reflow

  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(flyingImg)

    // Add a little pop effect to the cart badge if it exists
    const badge = document.querySelector('.cart-count-badge')
    if (badge) {
      badge.classList.remove('pop-animation')
      // eslint-disable-next-line no-void
      void badge.offsetWidth // Trigger reflow
      badge.classList.add('pop-animation')
    }

    playPopSound()
  }, 600) // Match CSS transition duration
}
