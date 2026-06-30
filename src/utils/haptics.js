// Create a global AudioContext for synthesizing sounds
const AudioContext = window.AudioContext || window.webkitAudioContext
let audioCtx = null

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  // Resume context if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

// Very soft, premium 'tick' sound for hovering
export const playHoverSound = () => {
  try {
    initAudio()
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(
      1200,
      audioCtx.currentTime + 0.05,
    )

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.05,
    )

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + 0.05)
  } catch (e) {
    // Ignore audio errors
  }
}

// Satisfying 'pop' sound for adding to cart
export const playPopSound = () => {
  try {
    initAudio()
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(400, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.1,
    )

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + 0.1)

    // Trigger haptic vibration if supported (Mobile)
    if (navigator.vibrate) {
      navigator.vibrate(15) // Short, crisp vibration
    }
  } catch (e) {
    // Ignore audio errors
  }
}

// Soft 'whoosh' sound for page transitions / modals
export const playTransitionSound = () => {
  try {
    initAudio()
    const bufferSize = audioCtx.sampleRate * 0.2 // 200ms of noise
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)

    // Generate pink-ish noise
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.5
    }

    const noiseSource = audioCtx.createBufferSource()
    noiseSource.buffer = buffer

    // Filter the noise to sound soft
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400

    const gainNode = audioCtx.createGain()
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.2,
    )

    noiseSource.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    noiseSource.start()
  } catch (e) {
    // Ignore errors
  }
}
