'use client';

import React from 'react';

interface MatrixVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
    activePointers?: string[];
    onAddPointer?: (name: string) => void;
    onRemovePointer?: (name: string) => void;
}

/**
 * Resolves a hydrated heap value into a 2D array of display strings.
 * Handles: array-of-arrays (Java 2D arrays), array-of-objects, etc.
 */
function resolveMatrix(value: any): { rows: any[][]; rowIds: string[] } {
    if (!value) return { rows: [], rowIds: [] };

    // After hydrateHistory, a 2D array is an array (JS) whose elements are
    // also arrays (each row). The outer array has __viz_type='array' and
    // each element is also an array with __viz_type='array'.
    const outerArr: any[] = Array.isArray(value) ? value : [];
    const rows: any[][] = [];
    const rowIds: string[] = [];

    for (const row of outerArr) {
        if (Array.isArray(row)) {
            rows.push([...row]);
            rowIds.push((row as any).__viz_id || String(rows.length));
        } else if (row && typeof row === 'object' && Array.isArray(row.data)) {
            // Hydrated form: { __viz_type: 'array', data: [...], __viz_id: '...' }
            rows.push([...row.data]);
            rowIds.push(row.__viz_id || String(rows.length));
        } else {
            rows.push([row]);
            rowIds.push(String(rows.length));
        }
    }
    return { rows, rowIds };
}

function cellDisplay(val: any): string {
    if (val === null || val === undefined) return '∅';
    if (typeof val === 'string') return val === ' ' ? '' : val;
    return String(val);
}

export const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({
    heap,
    variableName,
    activePointers = [],
    onAddPointer,
    onRemovePointer,
}) => {
    const raw = heap[variableName];
    const { rows, rowIds } = resolveMatrix(raw);

    const numRows = rows.length;
    const numCols = numRows > 0 ? Math.max(...rows.map(r => r.length)) : 0;

    // Resolve pointer values — each pointer maps to a number (row or col index)
    // We support two naming conventions:
    //   - single letter i/row → row highlight
    //   - single letter j/col → col highlight
    //   - pair i,j → cell highlight
    // We detect by checking if the pointer name looks like a row or col index.
    const rowPointers: { name: string; value: number }[] = [];
    const colPointers: { name: string; value: number }[] = [];

    const rowNames = /^(i|row|r|outer)$/i;
    const colNames = /^(j|col|c|inner|k)$/i;

    for (const name of activePointers) {
        const val = heap[name];
        if (typeof val !== 'number') continue;
        if (rowNames.test(name)) {
            rowPointers.push({ name, value: val });
        } else if (colNames.test(name)) {
            colPointers.push({ name, value: val });
        } else {
            // Ambiguous — add to both if in range
            if (val >= 0 && val < numRows) rowPointers.push({ name, value: val });
            if (val >= 0 && val < numCols) colPointers.push({ name, value: val });
        }
    }

    const highlightedRows = new Set(rowPointers.map(p => p.value));
    const highlightedCols = new Set(colPointers.map(p => p.value));

    // Cell is "active" if both its row AND col are highlighted (intersection = current cell)
    const isCellActive = (r: number, c: number) =>
        highlightedRows.has(r) && highlightedCols.has(c);
    const isRowHighlighted = (r: number) =>
        highlightedRows.has(r) && highlightedCols.size === 0;
    const isColHighlighted = (c: number) =>
        highlightedCols.has(c) && highlightedRows.size === 0;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const varName = e.dataTransfer.getData('application/react-dnd-var');
        if (varName && onAddPointer) onAddPointer(varName);
    };

    const CELL_SIZE = numCols > 8 ? 32 : numCols > 5 ? 40 : 48;

    return (
        <div
            className="relative w-full h-full overflow-auto p-6 flex flex-col"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-theme pb-3 mb-4 shrink-0">
                <div className="text-theme-secondary text-xs font-mono uppercase tracking-[0.2em]">
                    Matrix <span className="text-theme-tertiary">|</span>{' '}
                    <span className="text-accent font-bold">{variableName}</span>
                    <span className="text-theme-tertiary ml-2 text-[10px]">
                        {numRows}×{numCols}
                    </span>
                </div>
                <div className="text-[10px] text-theme-secondary opacity-60 italic">
                    drag variables here to highlight rows/cols
                </div>
            </div>

            {/* Active pointer badges */}
            {activePointers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 shrink-0">
                    {rowPointers.map(p => (
                        <span
                            key={p.name}
                            className="px-2 py-0.5 rounded-md bg-indigo-500/80 text-white text-[10px] font-bold cursor-pointer hover:bg-red-500 transition-colors"
                            onDoubleClick={() => onRemovePointer?.(p.name)}
                            title="Double click to remove"
                        >
                            row: {p.name}={p.value}
                        </span>
                    ))}
                    {colPointers.map(p => (
                        <span
                            key={p.name}
                            className="px-2 py-0.5 rounded-md bg-teal-500/80 text-white text-[10px] font-bold cursor-pointer hover:bg-red-500 transition-colors"
                            onDoubleClick={() => onRemovePointer?.(p.name)}
                            title="Double click to remove"
                        >
                            col: {p.name}={p.value}
                        </span>
                    ))}
                </div>
            )}

            {/* Matrix grid */}
            <div className="flex-grow flex items-start justify-center overflow-auto">
                <div className="relative">
                    {/* Column index header */}
                    <div className="flex mb-1 ml-8">
                        {Array.from({ length: numCols }, (_, c) => (
                            <div
                                key={c}
                                style={{ width: CELL_SIZE, height: 20 }}
                                className={`flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors ${highlightedCols.has(c) ? 'text-teal-400 font-bold' : 'text-theme-secondary opacity-50'}`}
                            >
                                {c}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-0.5">
                        {rows.map((row, r) => (
                            <div key={rowIds[r]} className="flex items-center gap-0.5">
                                {/* Row index label */}
                                <div
                                    style={{ width: 28 }}
                                    className={`text-[10px] font-mono text-right pr-1.5 shrink-0 transition-colors ${highlightedRows.has(r) ? 'text-indigo-400 font-bold' : 'text-theme-secondary opacity-50'}`}
                                >
                                    {r}
                                </div>

                                {/* Cells */}
                                {Array.from({ length: numCols }, (_, c) => {
                                    const cellVal = row[c];
                                    const active = isCellActive(r, c);
                                    const rowHl = isRowHighlighted(r) || (highlightedRows.has(r) && highlightedCols.size > 0);
                                    const colHl = isColHighlighted(c) || (highlightedCols.has(c) && highlightedRows.size > 0);
                                    const display = cellDisplay(cellVal);

                                    return (
                                        <div
                                            key={c}
                                            style={{ width: CELL_SIZE, height: CELL_SIZE }}
                                            className={`
                                                flex items-center justify-center
                                                border rounded font-mono text-sm font-bold
                                                shrink-0 relative select-none
                                                transition-colors transition-shadow duration-150
                                                ${active || (rowHl && colHl)
                                                    ? 'border-accent bg-accent/20 text-accent shadow-[0_0_12px_var(--accent-light)] scale-110 z-10'
                                                    : rowHl
                                                        ? 'border-indigo-500/60 bg-indigo-500/10 text-indigo-300'
                                                        : colHl
                                                            ? 'border-teal-500/60 bg-teal-500/10 text-teal-300'
                                                            : display === ''
                                                                ? 'border-theme-secondary/20 bg-theme-tertiary/20 text-theme-secondary/30'
                                                                : 'border-theme-secondary/30 bg-theme-tertiary/30 text-theme-primary'
                                                }
                                            `}
                                        >
                                            {display || (cellVal === null || cellVal === undefined ? '∅' : '')}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {numRows === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-theme-secondary font-mono text-sm border-2 border-dashed border-theme rounded-xl p-8 text-center opacity-50">
                        Matrix is empty
                    </div>
                </div>
            )}
        </div>
    );
};
