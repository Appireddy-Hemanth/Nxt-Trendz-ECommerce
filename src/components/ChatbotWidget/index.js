import {Component} from 'react'
import {FaRobot, FaTimes, FaPaperPlane} from 'react-icons/fa'
import './index.css'

const BOT_MESSAGES = {
  greeting:
    "Hi there! I'm your Nxt Trendz Style Assistant. How can I help you today?",
  options: [
    {id: 'gift', text: 'I need a gift recommendation'},
    {id: 'trending', text: "What's trending right now?"},
    {id: 'sale', text: 'Show me the best deals'},
  ],
  responses: {
    gift:
      "Great! A classic watch or a premium handbag makes a perfect gift. Check out our 'Accessories' category!",
    trending:
      'Right now, oversized hoodies and retro sneakers are flying off the shelves. Want to see them?',
    sale:
      "You're in luck! We have a massive end-of-season sale going on with up to 50% off select items.",
    fallback:
      "I'm still learning! But I recommend checking out our All Products page for the latest collections.",
  },
}

class ChatbotWidget extends Component {
  state = {
    isOpen: false,
    messages: [{id: 1, sender: 'bot', text: BOT_MESSAGES.greeting}],
    isTyping: false,
    showOptions: true,
  }

  toggleChat = () => {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  handleUserOption = option => {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        {id: Date.now(), sender: 'user', text: option.text},
      ],
      showOptions: false,
      isTyping: true,
    }))

    // Simulate network delay / typing
    setTimeout(() => {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          {
            id: Date.now(),
            sender: 'bot',
            text:
              BOT_MESSAGES.responses[option.id] ||
              BOT_MESSAGES.responses.fallback,
          },
        ],
        isTyping: false,
        showOptions: true, // show options again if they want more
      }))
    }, 1500)
  }

  render() {
    const {isOpen, messages, isTyping, showOptions} = this.state

    return (
      <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
        {/* Chat Window */}
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div>
                <h3 className="chatbot-title">Style Assistant</h3>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={this.toggleChat}
              aria-label="Close chat"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble bot typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {/* Scroll anchor */}
            <div style={{float: 'left', clear: 'both'}} />
          </div>

          {showOptions && !isTyping && (
            <div className="chatbot-options">
              {BOT_MESSAGES.options.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className="chat-option-btn"
                  onClick={() => this.handleUserOption(opt)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Select an option above..."
              disabled
              className="chatbot-input"
            />
            <button type="button" className="chatbot-send-btn" disabled>
              <FaPaperPlane size={18} />
            </button>
          </div>
        </div>

        {/* Floating Toggle Button */}
        <button
          type="button"
          className="chatbot-toggle-btn"
          onClick={this.toggleChat}
          aria-label="Toggle chat assistant"
        >
          {isOpen ? <FaTimes size={28} /> : <FaRobot size={28} />}
        </button>
      </div>
    )
  }
}

export default ChatbotWidget
