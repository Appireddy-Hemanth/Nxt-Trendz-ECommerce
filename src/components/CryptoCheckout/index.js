import {Component} from 'react'
import {FaWallet, FaCheckCircle, FaTimes, FaBitcoin} from 'react-icons/fa'
import './index.css'

class CryptoCheckout extends Component {
  state = {
    isOpen: false,
    step: 'connect', // connect, connecting, confirm, processing, success
    btcPrice: 65000,
    ethPrice: 3500,
    selectedCrypto: 'BTC',
  }

  componentDidMount() {
    // In a real app, we'd fetch this from CoinGecko API.
    // Simulating slight random price variations
    setInterval(() => {
      this.setState(prev => ({
        btcPrice: prev.btcPrice + (Math.random() * 100 - 50),
        ethPrice: prev.ethPrice + (Math.random() * 10 - 5),
      }))
    }, 3000)
  }

  openModal = () => this.setState({isOpen: true, step: 'connect'})

  closeModal = () => this.setState({isOpen: false})

  connectWallet = () => {
    this.setState({step: 'connecting'})
    setTimeout(() => {
      this.setState({step: 'confirm'})
    }, 2000)
  }

  confirmPayment = () => {
    this.setState({step: 'processing'})
    setTimeout(() => {
      this.setState({step: 'success'})
      setTimeout(() => {
        this.closeModal()
        // Here we could clear the cart or trigger success
      }, 3000)
    }, 3000)
  }

  getConvertedAmount = () => {
    const {totalAmount} = this.props
    const {selectedCrypto, btcPrice, ethPrice} = this.state

    // Assuming totalAmount is in INR, 1 USD ~ 83 INR
    const totalUSD = totalAmount / 83

    if (selectedCrypto === 'BTC') return (totalUSD / btcPrice).toFixed(6)
    return (totalUSD / ethPrice).toFixed(4)
  }

  render() {
    const {isOpen, step, selectedCrypto, btcPrice, ethPrice} = this.state
    const {totalAmount} = this.props

    return (
      <>
        <button
          type="button"
          className="crypto-pay-btn"
          onClick={this.openModal}
        >
          <FaWallet className="btn-icon" /> Pay with Web3 Wallet
        </button>

        {isOpen && (
          <div className="crypto-modal-overlay">
            <div className="crypto-modal-content">
              {step !== 'processing' && step !== 'connecting' && (
                <button
                  type="button"
                  className="crypto-close-btn"
                  onClick={this.closeModal}
                >
                  <FaTimes />
                </button>
              )}

              {step === 'connect' && (
                <div className="crypto-step">
                  <div className="crypto-header">
                    <h2>Connect Web3 Wallet</h2>
                    <p>Select your preferred wallet to complete purchase</p>
                  </div>
                  <div className="wallet-options">
                    <button
                      type="button"
                      className="wallet-btn metamask"
                      onClick={this.connectWallet}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                        alt="MetaMask"
                      />
                      MetaMask
                    </button>
                    <button
                      type="button"
                      className="wallet-btn phantom"
                      onClick={this.connectWallet}
                    >
                      <img
                        src="https://cryptologos.cc/logos/phantom-network-phm-logo.png"
                        alt="Phantom"
                        style={{filter: 'grayscale(100%) brightness(200%)'}}
                      />
                      Phantom
                    </button>
                    <button
                      type="button"
                      className="wallet-btn walletconnect"
                      onClick={this.connectWallet}
                    >
                      <img
                        src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.png"
                        alt="WalletConnect"
                      />
                      WalletConnect
                    </button>
                  </div>
                </div>
              )}

              {step === 'connecting' && (
                <div className="crypto-step center-content">
                  <div className="loading-spinner crypto-spinner" />
                  <h3>Waiting for Signature...</h3>
                  <p>Please approve the connection in your wallet extension</p>
                </div>
              )}

              {step === 'confirm' && (
                <div className="crypto-step">
                  <div className="crypto-header">
                    <h2>Confirm Transaction</h2>
                    <div className="wallet-connected-badge">
                      <div className="dot" /> 0x71C...9A23
                    </div>
                  </div>

                  <div className="crypto-selector">
                    <button
                      type="button"
                      className={`crypto-pill ${
                        selectedCrypto === 'BTC' ? 'active' : ''
                      }`}
                      onClick={() => this.setState({selectedCrypto: 'BTC'})}
                    >
                      <FaBitcoin /> BTC (${Math.round(btcPrice)})
                    </button>
                    <button
                      type="button"
                      className={`crypto-pill ${
                        selectedCrypto === 'ETH' ? 'active' : ''
                      }`}
                      onClick={() => this.setState({selectedCrypto: 'ETH'})}
                    >
                      ETH (${Math.round(ethPrice)})
                    </button>
                  </div>

                  <div className="crypto-amount-box">
                    <span className="crypto-amount-label">Amount Due</span>
                    <div className="crypto-amount-value">
                      {this.getConvertedAmount()} {selectedCrypto}
                    </div>
                    <span className="fiat-value">≈ ₹{totalAmount}</span>
                  </div>

                  <div className="crypto-gas-fee">
                    <span>Estimated Gas Fee:</span>
                    <span>~ $2.45</span>
                  </div>

                  <button
                    type="button"
                    className="crypto-confirm-btn"
                    onClick={this.confirmPayment}
                  >
                    Sign & Pay
                  </button>
                </div>
              )}

              {step === 'processing' && (
                <div className="crypto-step center-content">
                  <div className="blockchain-animation">
                    <div className="block b1" />
                    <div className="line" />
                    <div className="block b2" />
                    <div className="line" />
                    <div className="block b3" />
                  </div>
                  <h3>Confirming on Blockchain</h3>
                  <p>Waiting for network confirmations...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="crypto-step center-content">
                  <FaCheckCircle className="crypto-success-icon" />
                  <h2>Payment Successful!</h2>
                  <p>Tx Hash: 0x8f...39b4</p>
                  <p>Your order is being processed.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default CryptoCheckout
