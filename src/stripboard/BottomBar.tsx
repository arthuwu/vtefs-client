import { BoardSelector } from './BoardSelector';
import '../index.css'
import TestComponent from "../TestComponent";

const BottomBar = () => {
    return (
        <>
            <div className="bottombar">
                <TestComponent></TestComponent>
                <BoardSelector></BoardSelector>
            </div >
        </>
    )
}

export default BottomBar;