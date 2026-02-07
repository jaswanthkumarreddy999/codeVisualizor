// ================================================
// Problem 22: Min Stack
// ================================================
// Design a stack that supports push, pop, top, and retrieving the 
// minimum element in constant time.

// ============================================
// APPROACH 1: Two Stacks - O(1) Time, O(n) Space ⭐ OPTIMAL
// ============================================
Stack<Integer> mainStack = new Stack<>();
Stack<Integer> minStack = new Stack<>();

// Push operation
int val1 = -2;
mainStack.push(val1);
if (minStack.isEmpty() || val1 <= minStack.peek()) {
    minStack.push(val1);
}

int val2 = 0;
mainStack.push(val2);
if (minStack.isEmpty() || val2 <= minStack.peek()) {
    minStack.push(val2);
}

int val3 = -3;
mainStack.push(val3);
if (minStack.isEmpty() || val3 <= minStack.peek()) {
    minStack.push(val3);
}

System.out.println("Min Stack - getMin(): " + minStack.peek()); // -3

// Pop operation
int popped = mainStack.pop();
if (popped == minStack.peek()) {
    minStack.pop();
}

System.out.println("Min Stack - top(): " + mainStack.peek()); // 0
System.out.println("Min Stack - getMin(): " + minStack.peek()); // -2

// ============================================
// APPROACH 2: Single Stack with Pairs - O(1) Time, O(n) Space
// ============================================
// Store [value, minAtThisPoint] pairs
Stack<int[]> singleStack = new Stack<>();

// Push operations
int v1 = -2;
int min1 = singleStack.isEmpty() ? v1 : Math.min(v1, singleStack.peek()[1]);
singleStack.push(new int[]{v1, min1});

int v2 = 0;
int min2 = Math.min(v2, singleStack.peek()[1]);
singleStack.push(new int[]{v2, min2});

int v3 = -3;
int min3 = Math.min(v3, singleStack.peek()[1]);
singleStack.push(new int[]{v3, min3});

System.out.println("\nSingle Stack - getMin(): " + singleStack.peek()[1]); // -3

// Pop
singleStack.pop();

System.out.println("Single Stack - top(): " + singleStack.peek()[0]); // 0
System.out.println("Single Stack - getMin(): " + singleStack.peek()[1]); // -2
