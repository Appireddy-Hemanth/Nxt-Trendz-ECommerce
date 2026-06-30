import {Component, createRef} from 'react'
import './index.css'

class MiniGame extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = createRef()
    this.state = {
      isPlaying: false,
      score: 0,
      gameOver: false,
      hasWon: false,
    }

    // Game variables
    this.player = {x: 150, y: 350, w: 50, h: 50, speed: 6}
    this.items = []
    this.animationId = null
    this.keys = {ArrowLeft: false, ArrowRight: false}
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
    this.initCanvas()
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    if (this.animationId) cancelAnimationFrame(this.animationId)
  }

  handleKeyDown = e => {
    if (Object.prototype.hasOwnProperty.call(this.keys, e.key))
      this.keys[e.key] = true
  }

  handleKeyUp = e => {
    if (Object.prototype.hasOwnProperty.call(this.keys, e.key))
      this.keys[e.key] = false
  }

  initCanvas = () => {
    const canvas = this.canvasRef.current
    if (!canvas) return
    canvas.width = 320
    canvas.height = 400
    this.drawStartScreen()
  }

  drawStartScreen = () => {
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.fillStyle = '#0a0a1a'
    ctx.fillRect(0, 0, 320, 400)
    ctx.fillStyle = '#00f0ff'
    ctx.font = '20px "Inter"'
    ctx.textAlign = 'center'
    ctx.fillText('Catch the clothes!', 160, 180)
    ctx.fillStyle = '#a855f7'
    ctx.font = '14px "Inter"'
    ctx.fillText('Score 10 to unlock a secret!', 160, 220)
    ctx.fillText('Click "Start" to play', 160, 250)
  }

  startGame = () => {
    this.setState({isPlaying: true, score: 0, gameOver: false, hasWon: false})
    this.player.x = 135
    this.items = []
    this.gameLoop()
  }

  spawnItem = () => {
    if (Math.random() < 0.05) {
      // 5% chance per frame
      this.items.push({
        x: Math.random() * (320 - 30),
        y: -30,
        w: 30,
        h: 30,
        speed: 2 + Math.random() * 3,
        color: ['#00f0ff', '#a855f7', '#fbbf24', '#ff0055'][
          Math.floor(Math.random() * 4)
        ],
      })
    }
  }

  gameLoop = () => {
    const {isPlaying, gameOver} = this.state
    if (!isPlaying || gameOver) return

    const canvas = this.canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Update Player
    if (this.keys.ArrowLeft && this.player.x > 0)
      this.player.x -= this.player.speed
    if (this.keys.ArrowRight && this.player.x < canvas.width - this.player.w)
      this.player.x += this.player.speed

    // Spawn & Update Items
    this.spawnItem()
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].y += this.items[i].speed
    }

    // Collision Detection
    const {score, hasWon} = this.state
    let currentScore = score
    this.items = this.items.filter(item => {
      // Check collision
      if (
        item.x < this.player.x + this.player.w &&
        item.x + item.w > this.player.x &&
        item.y < this.player.y + this.player.h &&
        item.y + item.h > this.player.y
      ) {
        currentScore += 1
        return false // remove item
      }
      // Missed item
      if (item.y > canvas.height) {
        // Lose a life? Or just game over on miss?
        // Let's just say missed items don't matter, but there are bombs?
        // Keep it simple: no penalty for missing for now.
        return false
      }
      return true
    })

    if (currentScore >= 10 && !hasWon) {
      this.setState({score: currentScore, gameOver: true, hasWon: true})
      this.drawWinScreen()
      return
    }

    this.setState({score: currentScore})

    // Draw
    ctx.fillStyle = '#0a0a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Player (Shopping Bag)
    ctx.fillStyle = '#fff'
    ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h)
    ctx.fillStyle = '#444'
    ctx.fillRect(this.player.x + 10, this.player.y - 15, 30, 15) // handles

    // Draw Items
    this.items.forEach(item => {
      ctx.fillStyle = item.color
      ctx.fillRect(item.x, item.y, item.w, item.h)
    })

    // Draw Score
    ctx.fillStyle = '#00f0ff'
    ctx.font = '16px "Inter"'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${currentScore}`, 10, 25)

    this.animationId = requestAnimationFrame(this.gameLoop)
  }

  drawWinScreen = () => {
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.fillStyle = 'rgba(10, 10, 26, 0.9)'
    ctx.fillRect(0, 0, 320, 400)
    ctx.fillStyle = '#10b981'
    ctx.font = '24px "Inter"'
    ctx.textAlign = 'center'
    ctx.fillText('YOU WIN!', 160, 150)

    ctx.fillStyle = '#fff'
    ctx.font = '14px "Inter"'
    ctx.fillText('Use code:', 160, 200)

    ctx.fillStyle = '#fbbf24'
    ctx.font = '28px "Inter"'
    ctx.fillText('SECRET10', 160, 240)
  }

  render() {
    const {isPlaying, gameOver} = this.state
    return (
      <div className="mini-game-wrapper">
        <canvas ref={this.canvasRef} className="mini-game-canvas" />
        <div className="game-controls">
          {!isPlaying && !gameOver && (
            <button type="button" className="game-btn" onClick={this.startGame}>
              Start Game
            </button>
          )}
          {gameOver && (
            <button type="button" className="game-btn" onClick={this.startGame}>
              Play Again
            </button>
          )}
          <p className="game-instructions">Use Left/Right arrow keys to move</p>
        </div>
      </div>
    )
  }
}

export default MiniGame
