import { Main } from "./components/main"
import { AudioProvider } from "./context/audio-context"
import { ChatProvider } from "./context/chat-context"

function App() {

  return (
    <>
      <AudioProvider>
        <ChatProvider>
          <Main />
        </ChatProvider>
      </AudioProvider>
    </>
  )
}

export default App
