// ================================================
// Problem 27: Largest Rectangle in Histogram
// ================================================
// Given an array of integers heights representing the histogram's bar 
// heights, find the area of the largest rectangle in the histogram.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] heights = {2, 1, 5, 6, 2, 3};
int maxArea1 = 0;

for (int i = 0; i < heights.length; i++) {
    int minHeight = heights[i];
    for (int j = i; j < heights.length; j++) {
        minHeight = Math.min(minHeight, heights[j]);
        int width = j - i + 1;
        int area = minHeight * width;
        maxArea1 = Math.max(maxArea1, area);
    }
}

System.out.println("Largest Rectangle (Brute Force): " + maxArea1);

// ============================================
// APPROACH 2: Monotonic Stack - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
// Stack stores indices of increasing heights
int[] heights2 = {2, 1, 5, 6, 2, 3};
Stack<Integer> stack = new Stack<>();
int maxArea2 = 0;

for (int i = 0; i <= heights2.length; i++) {
    // Use 0 as sentinel for the end
    int currentHeight = (i == heights2.length) ? 0 : heights2[i];
    
    while (!stack.isEmpty() && currentHeight < heights2[stack.peek()]) {
        int height = heights2[stack.pop()];
        int width = stack.isEmpty() ? i : i - stack.peek() - 1;
        int area = height * width;
        maxArea2 = Math.max(maxArea2, area);
    }
    
    stack.push(i);
}

System.out.println("Largest Rectangle (Stack): " + maxArea2);

// ============================================
// APPROACH 3: Left and Right Boundaries - O(n) Time, O(n) Space
// ============================================
int[] heights3 = {2, 1, 5, 6, 2, 3};
int n = heights3.length;

// Find first smaller element on left for each bar
int[] leftBoundary = new int[n];
Stack<Integer> leftStack = new Stack<>();
for (int i = 0; i < n; i++) {
    while (!leftStack.isEmpty() && heights3[leftStack.peek()] >= heights3[i]) {
        leftStack.pop();
    }
    leftBoundary[i] = leftStack.isEmpty() ? -1 : leftStack.peek();
    leftStack.push(i);
}

// Find first smaller element on right for each bar
int[] rightBoundary = new int[n];
Stack<Integer> rightStack = new Stack<>();
for (int i = n - 1; i >= 0; i--) {
    while (!rightStack.isEmpty() && heights3[rightStack.peek()] >= heights3[i]) {
        rightStack.pop();
    }
    rightBoundary[i] = rightStack.isEmpty() ? n : rightStack.peek();
    rightStack.push(i);
}

// Calculate max area using boundaries
int maxArea3 = 0;
for (int i = 0; i < n; i++) {
    int width = rightBoundary[i] - leftBoundary[i] - 1;
    int area = heights3[i] * width;
    maxArea3 = Math.max(maxArea3, area);
}

System.out.println("Largest Rectangle (Boundaries): " + maxArea3);
