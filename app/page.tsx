'use client'

import 'regenerator-runtime/runtime'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mic } from 'lucide-react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
// import MicrophoneComponent from '@/components/SpeechToText'

export default function Component() {
  const [isListening, setIsListening] = useState(false)
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert(
        "Your browser doesn't support speech recognition. Please try a different browser."
      )
    }
  }, [browserSupportsSpeechRecognition])

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening()
      setIsListening(false)
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true })
      setIsListening(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-gray-100">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-500">
            Skill Shift
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Discover your path to new skills and careers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center">Tell us about yourself, including:</p>
          <ul className="list-disc list-inside mb-4 text-gray-300">
            <li>What you do for work now</li>
            <li>Your hobbies and interests</li>
            <li>What you want to learn or become</li>
          </ul>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full">
              <Button
                size="lg"
                className={`bg-green-500 hover:bg-green-600 p-6 rounded-full ${
                  isListening ? 'animate-pulse' : ''
                }`}
                onClick={handleListen}
                aria-label={isListening ? 'Stop recording' : 'Start recording'}
              >
                <Mic className="h-8 w-8" />
              </Button>
              {isListening && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-8 bg-green-500 rounded-full animate-wave"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full mt-8 p-4 bg-gray-700 rounded-md min-h-[100px] max-h-[200px] overflow-y-auto">
              <p className="text-gray-300">
                {transcript || 'Your speech will appear here...'}
              </p>
            </div>
          </div>
          {/* <MicrophoneComponent /> */}
        </CardContent>
      </Card>
    </main>
  )
}
