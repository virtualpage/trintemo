import { AudioProvider } from "./context/audio-context"
import { ChatProvider } from "./context/chat-context"
import { AppRoutes } from "./routes/routes"

function App() {

  return (
    <>
      <AudioProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AudioProvider>
    </>
  )
}

export default App
