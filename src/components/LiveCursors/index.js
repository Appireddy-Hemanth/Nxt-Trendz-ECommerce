import {Component} from 'react'
import {FaMousePointer} from 'react-icons/fa'
import './index.css'

const CURSORS = [
  {id: 'c1', color: '#ff0055', name: 'Alex M.'},
  {id: 'c2', color: '#00f0ff', name: 'Guest'},
  {id: 'c3', color: '#a855f7', name: 'Sarah T.'},
]

class LiveCursors extends Component {
  state = {
    activeCursors: [],
  }

  componentDidMount() {
    // Decide randomly to show 1 or 2 cursors
    const numCursors = Math.random() > 0.5 ? 2 : 1
    const selectedCursors = CURSORS.sort(() => 0.5 - Math.random()).slice(
      0,
      numCursors,
    )

    // Initialize starting positions off-screen or randomly
    const initializedCursors = selectedCursors.map(c => ({
      ...c,
      x: window.innerWidth / 2 + (Math.random() * 400 - 200),
      y: window.innerHeight + 100,
      opacity: 0,
    }))

    this.setState({activeCursors: initializedCursors}, this.startMovementLoop)
  }

  componentWillUnmount() {
    if (this.moveTimer) clearTimeout(this.moveTimer)
  }

  startMovementLoop = () => {
    const move = () => {
      this.setState(prevState => ({
        activeCursors: prevState.activeCursors.map(c => {
          // Occasionally hide or show
          let newOpacity = c.opacity
          if (Math.random() < 0.05) newOpacity = Math.random() > 0.3 ? 1 : 0
          if (newOpacity === 0) return {...c, opacity: 0}

          // Generate a smooth organic move target
          const targetX =
            Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1
          const targetY =
            Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1

          return {
            ...c,
            x: targetX,
            y: targetY,
            opacity: 1,
          }
        }),
      }))

      // Random interval between moves to simulate human reading/moving
      this.moveTimer = setTimeout(move, 2000 + Math.random() * 3000)
    }

    // Initial fade in after 1s
    this.moveTimer = setTimeout(move, 1000)
  }

  render() {
    const {activeCursors} = this.state

    return (
      <div className="live-cursors-container">
        {activeCursors.map(cursor => (
          <div
            key={cursor.id}
            className="mock-cursor"
            style={{
              transform: `translate(${cursor.x}px, ${cursor.y}px)`,
              opacity: cursor.opacity,
            }}
          >
            <FaMousePointer
              size={18}
              color={cursor.color}
              style={{stroke: 'white', strokeWidth: '1px'}}
            />
            <div
              className="mock-cursor-label"
              style={{backgroundColor: cursor.color}}
            >
              {cursor.name}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default LiveCursors
