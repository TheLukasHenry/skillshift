import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mic } from 'lucide-react'

export default function Home() {
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
          <div className="flex items-center space-x-2">
            <Input
              className="flex-grow bg-gray-700 text-gray-100 border-gray-600 focus:border-green-500"
              placeholder="Start talking about yourself..."
              disabled
            />
            <Button size="icon" className="bg-green-500 hover:bg-green-600">
              <Mic className="h-6 w-6" />
              <span className="sr-only">Start recording</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
