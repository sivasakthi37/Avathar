import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Experience } from './components/Experience'
import { UI } from './components/UI'
import { useEffect } from 'react'
import { useChat } from './hooks/useChat'
function App() {
  const { chat } = useChat()
  useEffect(() => {
    console.log('UseEffect trigger')
    const handleMessage = (event) => {
      console.log('event', event)
      const message = JSON.parse(event.data)
      console.log('Received message:', message)

      if (message.action === 'playAudio') {
        console.log('action event trigger')
        chat()
      }
    }

    window.addEventListener('message', handleMessage)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: '100vh', zIndex: 100 }}>
        <Loader />
        <Leva hidden />
        <UI hidden={true} />
        <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
          <Experience />
        </Canvas>
      </div>
    </>
  )
}

export default App
