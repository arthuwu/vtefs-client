import BottomBar from './stripboard/BottomBar';
import Stripboard from './stripboard/Stripboard';
import './index.css'
import { WebSocketProvider } from './WebSocketContext';
import boardData from "./config/boards.json";
import { BoardProvider } from './stripboard/BoardContext';

function App() {
  return (
    <>
      <BoardProvider boardsData={boardData.boards}>
        <WebSocketProvider url="ws://localhost:8080">
          <div className='board-container'>
            <Stripboard></Stripboard>
            <BottomBar></BottomBar>
          </div>
        </WebSocketProvider>
      </BoardProvider>
    </>
  )
}

export default App