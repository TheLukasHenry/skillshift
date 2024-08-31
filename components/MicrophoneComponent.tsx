'use client'

import { useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

export default function MicrophoneComponent() {
  const [isRecording, setIsRecording] = useState(false)
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    console.error('Browser does not support speech recognition.')
    return <span>Browser doesn't support speech recognition.</span>
  }

  const startRecording = () => {
    console.log('Start recording')
    setIsRecording(true)
    resetTranscript()
    try {
      SpeechRecognition.startListening({ continuous: true })
    } catch (error) {
      console.error('Error starting speech recognition:', error)
    }
  }

  const stopRecording = () => {
    console.log('Stop recording')
    setIsRecording(false)
    try {
      SpeechRecognition.stopListening()
    } catch (error) {
      console.error('Error stopping speech recognition:', error)
    }
  }

  const handleToggleRecording = () => {
    console.log('Toggle recording')
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full">
        {(isRecording || transcript) && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {isRecording ? 'Recording' : 'Recorded'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? 'Start speaking...' : 'Thanks for talking.'}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="border rounded-md p-2 h-full mt-4">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center w-full">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
              >
                <path
                  fill="currentColor"
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
