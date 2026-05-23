import { StateSnapshot } from '@/types/Project';

/**
 * Parse for-each loop relationships from Java/TypeScript source code.
 * Returns a map of { iteratorVar -> arrayVar } for every for-each found.
 * e.g. "for (int x : arr)" → { x: 'arr' }
 */
function parseForeachRelationships(code: string): Record<string, string> {
  const map: Record<string, string> = {};
  // Match: for ( <type> <varName> : <arrayExpr> )
  // Handles: for(int x : arr), for (String s : list), for (var n : nums), etc.
  const re = /for\s*\(\s*(?:[\w<>\[\]]+\s+)+(\w+)\s*:\s*(\w+)\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const iterVar = m[1];   // e.g. "x"
    const arrayVar = m[2];  // e.g. "arr"
    map[iterVar] = arrayVar;
  }
  return map;
}

export function hydrateBackendHistory(history: any[], code?: string): StateSnapshot[] {
  // Parse for-each relationships once from the source code
  const foreachMap = code ? parseForeachRelationships(code) : {};

  // Track last known values for variables that temporarily go out of scope
  // (e.g. for-each loop variable disappears on the loop header step)
  const lastKnownHeap: Record<string, any> = {};

  return history.map((snapshot) => {
    const store = snapshot.store || {};
    const roots = snapshot.roots || {};
    const heap: Record<string, any> = {};

    const resolveValue = (val: any): any => {
      if (val && typeof val === 'object' && '__viz_ref' in val) {
        const refId = val.__viz_ref;
        if (store[refId]) {
          const obj = store[refId];
          const resolved: any = Array.isArray(obj.value) ? [] : {};

          // Reconstruct with metadata
          if (obj.type) resolved.__viz_type = obj.type;
          resolved.__viz_id = refId;

          // Hydrate properties
          if (Array.isArray(obj.value)) {
            obj.value.forEach((item: any) => resolved.push(resolveValue(item)));
          } else {
            Object.entries(obj.value).forEach(([k, v]) => {
              resolved[k] = resolveValue(v);
            });
          }
          return resolved;
        }
      }
      return val;
    };

    Object.entries(roots).forEach(([key, val]) => {
      heap[key] = resolveValue(val);
    });

    // Carry forward variables that were present in the previous step but are now
    // temporarily out of scope (e.g. for-each loop variable on the loop header line).
    // Only carry forward primitives and arrays — not Scanner/system objects.
    Object.entries(lastKnownHeap).forEach(([key, val]) => {
      if (!(key in heap)) {
        const isPrimitive = typeof val === 'number' || typeof val === 'boolean' || typeof val === 'string';
        const isArray = Array.isArray(val);
        if (isPrimitive || isArray) {
          heap[key] = val;
        }
      }
    });

    // Update last known heap with current values
    Object.entries(heap).forEach(([key, val]) => {
      lastKnownHeap[key] = val;
    });

    // Tag for-each iterator variables so ArrayVisualizer knows they are
    // value-iterators, not index pointers.
    // We wrap the primitive in a special object: { __viz_foreach_of: 'arr', value: 3 }
    Object.entries(foreachMap).forEach(([iterVar, arrayVar]) => {
      if (iterVar in heap && typeof heap[iterVar] !== 'object') {
        heap[iterVar] = {
          __viz_foreach_of: arrayVar,
          value: heap[iterVar]
        };
      }
    });

    return {
      line: snapshot.line,
      heap,
      stack: snapshot.stack || [],
      stdout: snapshot.stdout || '',
      description: snapshot.description || ''
    };
  });
}
