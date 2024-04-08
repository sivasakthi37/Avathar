import { createContext, useContext, useEffect, useState } from 'react'

const backendUrl = 'http://localhost:3000'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setLoading(true)
    // const data = await fetch(`${backendUrl}/chat`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message }),
    // })
    // const resp = (await data.json()).messages

    const resp = {
      text: "Hey I'm clarus how may i help you today?",
      audio:
        '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',
      lipsync: {
        metadata: {
          soundFile:
            '/Users/wawa/Documents/Projects/wawasensei/r3f-virtual-girlfriend-backend/audios/api_0.wav',
          duration: 2.69,
        },
        mouthCues: [
          { start: 0.0, end: 0.01, value: 'X' },
          { start: 0.01, end: 0.07, value: 'A' },
          { start: 0.07, end: 0.31, value: 'B' },
          { start: 0.31, end: 0.39, value: 'A' },
          { start: 0.39, end: 0.66, value: 'B' },
          { start: 0.66, end: 0.78, value: 'X' },
          { start: 0.78, end: 0.86, value: 'B' },
          { start: 0.86, end: 0.93, value: 'E' },
          { start: 0.93, end: 1.07, value: 'F' },
          { start: 1.07, end: 1.21, value: 'C' },
          { start: 1.21, end: 1.35, value: 'F' },
          { start: 1.35, end: 1.42, value: 'C' },
          { start: 1.42, end: 1.63, value: 'F' },
          { start: 1.63, end: 1.7, value: 'C' },
          { start: 1.7, end: 1.78, value: 'A' },
          { start: 1.78, end: 1.96, value: 'B' },
          { start: 1.96, end: 2.03, value: 'D' },
          { start: 2.03, end: 2.45, value: 'B' },
          { start: 2.45, end: 2.69, value: 'X' },
        ],
      },
      facialExpression: 'smile',
      animation: 'Talking_1',
    }

    console.log('resp', resp)
    setMessages((messages) => [...messages, resp])
    setLoading(false)
  }
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [cameraZoomed, setCameraZoomed] = useState(true)
  const onMessagePlayed = () => {
    console.log('onMessagePlayed', onMessagePlayed)
    setMessages((messages) => messages.slice(1))
  }

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0])
    } else {
      setMessage(null)
    }
  }, [messages])

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
