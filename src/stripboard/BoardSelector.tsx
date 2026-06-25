import { useBoardContext } from "./BoardContext";

export function BoardSelector() {
    const boardContext = useBoardContext();

    if (!boardContext) return;

    const {
        boards,
        currentBoardId,
        setCurrentBoard,
    } = boardContext;

    return (
        <select
            value={currentBoardId ?? ""}
            onChange={e =>
                setCurrentBoard(e.target.value)
            }
        >
            {boards.map((board: any) => (
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