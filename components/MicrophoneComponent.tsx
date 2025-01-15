'use client'

import { useState, useCallback, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mic, Square } from 'lucide-react'

export default function Component() {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition()

  useEffect(() => {
    setIsAnimating(listening)
  }, [listening])

  const startRecording = useCallback(() => {
    resetTranscript()
    setIsRecording(true)
    SpeechRecognition.startListening({ continuous: true }).catch((error) => {
      console.error('Error starting speech recognition:', error)
      setIsRecording(false)
    })
  }, [resetTranscript])

  const stopRecording = useCallback(() => {
    setIsRecording(false)
    SpeechRecognition.stopListening().catch((error) => {
      console.error('Error stopping speech recognition:', error)
    })
  }, [])

  const handleToggleRecording = useCallback(() => {
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }, [isRecording, startRecording, stopRecording])

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
        <p>Browser doesn&apos;t support speech recognition.</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-500">
            Skill Shift
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Discover your path to new skills and careers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="mb-2 text-center">
              Tell us about yourself, including:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>What you do for work now</li>
              <li>Your hobbies and interests</li>
              <li>What you want to learn or become</li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button
              size="lg"
              className={`p-6 rounded-full ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
              <span className="sr-only">
                {isRecording ? 'Stop recording' : 'Start recording'}
              </span>
            </Button>

            {isAnimating && (
              <div className="flex space-x-1">
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

          {(isRecording || transcript) && (
            <div className="mt-4 p-4 bg-gray-700 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">
                  {isRecording ? 'Recording' : 'Recorded'}
                </p>
                {isRecording && (
                  <div className="rounded-full w-3 h-3 bg-red-500 animate-pulse" />
                )}
              </div>
              <p className="text-gray-300 min-h-[100px] max-h-[200px] overflow-y-auto">
                {transcript || 'Your speech will appear here...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
