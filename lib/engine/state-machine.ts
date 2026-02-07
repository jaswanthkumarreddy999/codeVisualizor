import { nanoid } from 'nanoid';

export interface StateSnapshot {
    heap: Record<string, any>;
    stack: Record<string, any>;
    line: number;
    description: string;
    conditionResult?: boolean;
}

export class ExecutionEngine {
    private history: StateSnapshot[] = [];
    private currentHeap: Record<string, any> = {};

    constructor() { }

    private createId() {
        return nanoid(8);
    }

    // Helper to ensure objects have IDs for Framer Motion layoutId
    private processValue(value: any) {
        if (value && typeof value === 'object' && !value.__viz_id) {
            Object.defineProperty(value, '__viz_id', {
                value: this.createId(),
                enumerable: false, // Don't show in normal iteration
                writable: false
            });

            // Auto-tag type
            let type = 'object';
            if ('next' in value) type = 'node';
            else if ('left' in value || 'right' in value) type = 'treenode';
            else if (Array.isArray(value)) type = 'array';

            Object.defineProperty(value, '__viz_type', {
                value: type,
                enumerable: false,
                writable: true
            });
        }
        return value;
    }

    // Deep clone state for snapshot
    private captureSnapshot(line: number, name: string, type: string): StateSnapshot {
        // Basic approximation of snapshotting
        // In a real engine, we'd need a more robust way to handle cyclic references
        const snapshot: StateSnapshot = {
            heap: { ...this.currentHeap },
            stack: {}, // Placeholder for now
            line,
            description: `${type}: ${name}`
        };
        return JSON.parse(JSON.stringify(snapshot, (key, value) => {
            if (value && typeof value === 'object') {
                if (value.__viz_id) {
                    return { ...value, __viz_id: value.__viz_id };
                }
            }
            return value;
        }));
    }

    run(instrumentedCode: string, inputVal: string = '') {
        this.history = [];
        this.currentHeap = {};

        const _trace = (name: string, value: any, line: number, type: string) => {
            const processedValue = this.processValue(value);

            // Only add top-level variables to the heap
            // Ignore member expressions like 'arr[i]' or 'obj.prop' to avoid polluting the heap/pointers
            if (!name.includes('[') && !name.includes('.')) {
                this.currentHeap[name] = processedValue;
            }

            this.history.push({
                heap: this.cloneHeap(this.currentHeap),
                stack: {},
                line,
                description: `${type} ${name}`,
                conditionResult: type === 'condition' ? !!value : undefined
            });

            return processedValue;
        };

        // Define Node classes for SLL and BST
        const Node = class {
            value: any;
            next: any = null;
            constructor(val: any) {
                this.value = val;
            }
        };

        const TreeNode = class {
            value: any;
            left: any = null;
            right: any = null;
            constructor(val: any) {
                this.value = val;
            }
        };

        // Mock IO
        const inputLines = inputVal ? inputVal.split('\n') : [];
        let inputIndex = 0;
        const mockPrompt = (msg?: string) => {
            // For now, ignore msg (prompt text) or maybe push to output?
            // "Standard" behavior: prompt() shows dialog, input() prints prompt to stdout without newline.
            // Let's just return next line.
            if (inputIndex < inputLines.length) {
                return inputLines[inputIndex++];
            }
            return '';
        };

        const capturedOutput: string[] = [];
        const mockConsole = {
            log: (...args: any[]) => {
                const line = args.map(a => {
                    if (typeof a === 'object') return JSON.stringify(a);
                    return String(a);
                }).join(' ');
                capturedOutput.push(line);
            },
            error: (...args: any[]) => {
                const line = args.map(a => String(a)).join(' ');
                capturedOutput.push('Error: ' + line);
            }
        };

        try {
            // Add console, prompt, input, alert mocks
            // Using 'prompt' and 'input' (alias)
            const execute = new Function('_trace', 'Node', 'TreeNode', 'console', 'prompt', 'input', 'alert', instrumentedCode);
            execute(_trace, Node, TreeNode, mockConsole, mockPrompt, mockPrompt, mockConsole.log);
        } catch (e) {
            console.error('Execution Error:', e);
            capturedOutput.push('Runtime Error: ' + String(e));
        }

        return {
            history: this.history,
            stdout: capturedOutput.join('\n')
        };
    }

    private cloneHeap(heap: Record<string, any>) {
        // Simple clone that preserves __viz_id
        const visited = new Map();

        const clone = (obj: any): any => {
            if (!obj || typeof obj !== 'object') return obj;
            if (visited.has(obj)) return visited.get(obj);

            const result: any = Array.isArray(obj) ? [] : {};
            visited.set(obj, result);

            if (obj.__viz_id) {
                Object.defineProperty(result, '__viz_id', { value: obj.__viz_id });
            }

            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    result[key] = clone(obj[key]);
                }
            }
            return result;
        };

        return clone(heap);
    }
}
