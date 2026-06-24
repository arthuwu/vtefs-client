import { useBoardContext } from "./BoardContext";

export function BoardSelector() {
    const {
        boards,
        currentBoardId,
        setCurrentBoard,
    } = useBoardContext();

    return (
        <select
            value={currentBoardId ?? ""}
            onChange={e =>
                setCurrentBoard(e.target.value)
            }
        >
            {boards.map(board => (
                <option
                    key={board.id}
                    value={board.id}
                >
                    {board.name}
                </option>
            ))}
        </select>
    );
}