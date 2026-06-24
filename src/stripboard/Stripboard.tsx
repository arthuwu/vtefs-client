import '../index.css'
import { useBoardContext } from "./BoardContext";
import type { Bay } from './BoardContext';
import StripBay from './StripBay';

function getColumnSpacing(cropped: string): string {
    return cropped === "left"
        ? "0.5fr 1fr 1fr"
        : "1fr 1fr 0.5fr";
}

function getRowSpacing(column: Bay[]): string {
    return column
        .map(bay =>
            bay.height === -1
                ? "1fr"
                : `calc(${bay.height} * 5.2%)`
        )
        .join(" ");
}

const Stripboard = () => {
    const { currentBoard } = useBoardContext();

    if (!currentBoard) {
        return null;
    }

    return (
        <>
            <div className="stripboard"
                style={{
                    display: "grid",
                    gridTemplateColumns: getColumnSpacing(currentBoard.cropped),
                }}
            >
                {currentBoard.columns.map(
                    (column, columnIndex) => (
                        <div
                            key={columnIndex}
                            style={{
                                display: "grid",
                                gridTemplateRows: getRowSpacing(column),
                            }}
                        >
                            {column.map(bay => (
                                <StripBay
                                    key={bay.id}
                                    name={bay.name}
                                />
                            ))}
                        </div>
                    )
                )}

            </div>
        </>
    )
}

export default Stripboard;