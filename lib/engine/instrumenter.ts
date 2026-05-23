import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

export interface TraceRecord {
    name: string;
    value: any;
    line: number;
    type: 'assignment' | 'declaration' | 'property_update' | 'call';
    metadata?: any;
}

export function instrument(code: string): string {
    try {
        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        });

        traverse(ast, {
            VariableDeclarator(path) {
                if ((path.node as any)._processed) return;

                if (t.isIdentifier(path.node.id) && path.node.init) {
                    const name = path.node.id.name;
                    (path.node as any)._processed = true;

                    // Wrap the init expression in a _trace call
                    // let a = 5  =>  let a = _trace('a', 5, line, 'declaration')
                    const originalInit = path.node.init;

                    const traceCall = t.callExpression(t.identifier('_trace'), [
                        t.stringLiteral(name),
                        originalInit as t.Expression,
                        t.numericLiteral(path.node.loc?.start.line || 0),
                        t.stringLiteral('declaration'),
                    ]);

                    path.node.init = traceCall;
                    // Do NOT skip, so we can traverse into the init (e.g. function expressions)
                }
            },

            AssignmentExpression(path) {
                if ((path.node as any)._processed) return;

                const { left, right, operator } = path.node;
                let name = '';
                let type: 'assignment' | 'property_update' = 'assignment';

                if (t.isIdentifier(left)) {
                    name = left.name;
                } else if (t.isMemberExpression(left)) {
                    name = generate(left).code;
                    type = 'property_update';
                }

                if (name) {
                    const originalNode = { ...path.node };
                    (originalNode as any)._processed = true;

                    const traceCall = t.callExpression(t.identifier('_trace'), [
                        t.stringLiteral(name),
                        originalNode,
                        t.numericLiteral(path.node.loc?.start.line || 0),
                        t.stringLiteral(type),
                    ]);
                    path.replaceWith(traceCall);
                    path.skip();
                }
            },

            UpdateExpression(path) {
                if ((path.node as any)._processed) return;

                const { argument, operator, prefix } = path.node;
                if (t.isIdentifier(argument)) {
                    const name = argument.name;

                    // Check if return value is ignored (e.g. i++ in for loop, or i++; statement)
                    const isResultIgnored =
                        (t.isExpressionStatement(path.parent) && path.parentPath.key !== 'expression') || // This check is slightly wrong for babel types, usually parent type alone is enough
                        t.isExpressionStatement(path.parent) ||
                        (t.isForStatement(path.parent) && path.key === 'update');

                    if (isResultIgnored) {
                        // Transform to: (i++, _trace('i', i, ...))
                        // This executes update, then traces the NEW value
                        const originalUpdate = { ...path.node };
                        (originalUpdate as any)._processed = true;

                        const traceCall = t.callExpression(t.identifier('_trace'), [
                            t.stringLiteral(name),
                            t.identifier(name), // Pass the variable itself to get new value
                            t.numericLiteral(path.node.loc?.start.line || 0),
                            t.stringLiteral('assignment'),
                        ]);

                        path.replaceWith(t.sequenceExpression([
                            originalUpdate,
                            traceCall
                        ]));
                        path.skip();
                    } else {
                        // Fallback: This captures OLD value for postfix. (i++ returns old)
                        // This is technically correct for the expression value, but lags the heap state.
                        // Ideally we'd wrap valid usage too, but that requires temp vars.
                        const traceCall = t.callExpression(t.identifier('_trace'), [
                            t.stringLiteral(name),
                            path.node,
                            t.numericLiteral(path.node.loc?.start.line || 0),
                            t.stringLiteral('assignment'),
                        ]);
                        path.replaceWith(traceCall);
                        path.skip();
                    }
                }
            },

            IfStatement(path) {
                if ((path.node as any)._processed) return;

                const test = path.node.test;
                if (t.isCallExpression(test) && t.isIdentifier(test.callee) && test.callee.name === '_trace') return;

                const traceCall = t.callExpression(t.identifier('_trace'), [
                    t.stringLiteral('if condition'),
                    test,
                    t.numericLiteral(path.node.loc?.start.line || 0),
                    t.stringLiteral('condition'),
                ]);

                path.node.test = traceCall;
                (path.node as any)._processed = true;
            },

            WhileStatement(path) {
                if ((path.node as any)._processed) return;

                const test = path.node.test;
                if (t.isCallExpression(test) && t.isIdentifier(test.callee) && test.callee.name === '_trace') return;

                const traceCall = t.callExpression(t.identifier('_trace'), [
                    t.stringLiteral('while condition'),
                    test,
                    t.numericLiteral(path.node.loc?.start.line || 0),
                    t.stringLiteral('condition'),
                ]);

                path.node.test = traceCall;
                (path.node as any)._processed = true;
            },

            DoWhileStatement(path) {
                if ((path.node as any)._processed) return;

                const test = path.node.test;
                if (t.isCallExpression(test) && t.isIdentifier(test.callee) && test.callee.name === '_trace') return;

                const traceCall = t.callExpression(t.identifier('_trace'), [
                    t.stringLiteral('do-while condition'),
                    test,
                    t.numericLiteral(path.node.loc?.start.line || 0),
                    t.stringLiteral('condition'),
                ]);

                path.node.test = traceCall;
                (path.node as any)._processed = true;
            },

            ForStatement(path) {
                if ((path.node as any)._processed) return;

                const test = path.node.test;
                if (test) {
                    if (t.isCallExpression(test) && t.isIdentifier(test.callee) && test.callee.name === '_trace') return;

                    const traceCall = t.callExpression(t.identifier('_trace'), [
                        t.stringLiteral('for condition'),
                        test,
                        t.numericLiteral(path.node.loc?.start.line || 0),
                        t.stringLiteral('condition'),
                    ]);

                    path.node.test = traceCall;
                }
                (path.node as any)._processed = true;
            },

            ForInStatement(path) {
                if ((path.node as any)._processed) return;

                const left = path.node.left;
                let name = 'item';
                
                if (t.isVariableDeclaration(left) && t.isVariableDeclarator(left.declarations[0])) {
                    const id = left.declarations[0].id;
                    if (t.isIdentifier(id)) name = id.name;
                }

                // Inject a trace inside the body to show the current key
                const body = path.get('body');
                const traceCall = t.expressionStatement(t.callExpression(t.identifier('_trace'), [
                    t.stringLiteral(name),
                    t.identifier(name),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                    t.stringLiteral('assignment'),
                ]));

                if (body.isBlockStatement()) {
                    body.node.body.unshift(traceCall);
                } else {
                    body.replaceWith(t.blockStatement([traceCall, body.node as t.Statement]));
                }

                (path.node as any)._processed = true;
            },

            ForOfStatement(path) {
                if ((path.node as any)._processed) return;

                const left = path.node.left;
                let name = 'item';

                if (t.isVariableDeclaration(left) && t.isVariableDeclarator(left.declarations[0])) {
                    const id = left.declarations[0].id;
                    if (t.isIdentifier(id)) name = id.name;
                }

                const body = path.get('body');
                const traceCall = t.expressionStatement(t.callExpression(t.identifier('_trace'), [
                    t.stringLiteral(name),
                    t.identifier(name),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                    t.stringLiteral('assignment'),
                ]));

                if (body.isBlockStatement()) {
                    body.node.body.unshift(traceCall);
                } else {
                    body.replaceWith(t.blockStatement([traceCall, body.node as t.Statement]));
                }

                (path.node as any)._processed = true;
            },
        });

        return generate(ast).code;
    } catch (e) {
        console.error('Babel Parse Error:', e);
        throw e;
    }
}
