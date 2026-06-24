import React, { createContext, useContext, useMemo, useState, } from "react";


export interface Bay {
    id: string;
    name: string;
    height: number;
}

export interface Board {
    id: string;
    name: string;
    cropped: string;
    columns: Bay[][];
}

export interface BoardsFile {
    boards: Board[];
}

export interface BoardContextInterface {
    boards: Board[];

    currentBoardId: string | null;
    currentBoard: Board | null;

    setCurrentBoard: (id: string) => void;
}

const BoardContext = createContext<BoardContextInterface | null>(null);

export function useBoardContext() {
    const ctx = useContext(BoardContext);
    return ctx;
}

interface Props {
    boardsData: Board[];
    children: React.ReactNode;
}

export function BoardProvider({ boardsData, children }: Props) {
    const [boards] = useState<Board[]>(boardsData);

    const [currentBoardId, setCurrentBoardId] = useState<string | null>(boardsData[0]?.id ?? null);

    const currentBoard = useMemo(
        () =>
            boards.find(
                board => board.id === currentBoardId
            ) ?? null,
        [boards, currentBoardId]
    );

    const value = useMemo(
        () => ({
            boards,
            currentBoardId,
            currentBoard,
            setCurrentBoard: setCurrentBoardId,
        }),
        [boards, currentBoardId, currentBoard]
    );

    return (
        <BoardContext value={value}>
            {children}
        </BoardContext>
    );
}