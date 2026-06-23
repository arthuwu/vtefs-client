import TestComponent from './TestComponent';
import { WebSocketProvider } from './WebSocketContext';

function App() {
  return (
    <>
      <WebSocketProvider url="ws://localhost:8080">
        <div>Hello world!</div>
        <TestComponent></TestComponent>
      </WebSocketProvider>
    </>
  )
}

export default App
