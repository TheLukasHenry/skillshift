import { useState } from 'react'

export default function SpeechToText() {
  const [text, setText] = useState('')

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setText(transcript)
    }

    recognition.start()
  }

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <p>Transcribed Text: {text}</p>
    </div>
  )
}
