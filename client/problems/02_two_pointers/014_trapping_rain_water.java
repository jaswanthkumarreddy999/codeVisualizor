// ================================================
// Problem 14: Trapping Rain Water
// ================================================
// Given n non-negative integers representing an elevation map where 
// the width of each bar is 1, compute how much water it can trap after raining.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
int water1 = 0;

for (int i = 0; i < height.length; i++) {
    int leftMax = 0, rightMax = 0;
    
    // Find max height to the left
    for (int j = 0; j <= i; j++) {
        leftMax = Math.max(leftMax, height[j]);
    }
    
    // Find max height to the right
    for (int j = i; j < height.length; j++) {
        rightMax = Math.max(rightMax, height[j]);
    }
    
    water1 += Math.min(leftMax, rightMax) - height[i];
}

System.out.println("Trapping Rain Water (Brute Force): " + water1);

// ============================================
// APPROACH 2: DP with Prefix/Suffix - O(n) Time, O(n) Space
// ============================================
int[] height2 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
int n = height2.length;

// Precompute left max for each position
int[] leftMax = new int[n];
leftMax[0] = height2[0];
for (int i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height2[i]);
}

// Precompute right max for each position
int[] rightMax = new int[n];
rightMax[n - 1] = height2[n - 1];
for (int i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height2[i]);
}

// Calculate water
int water2 = 0;
for (int i = 0; i < n; i++) {
    water2 += Math.min(leftMax[i], rightMax[i]) - height2[i];
}

System.out.println("Trapping Rain Water (DP): " + water2);

// ============================================
// APPROACH 3: Two Pointers - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] height3 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
int left = 0, right = height3.length - 1;
int leftMaxVal = 0, rightMaxVal = 0;
int water3 = 0;

while (left < right) {
    if (height3[left] < height3[right]) {
        if (height3[left] >= leftMaxVal) {
            leftMaxVal = height3[left];
        } else {
            water3 += leftMaxVal - height3[left];
        }
        left++;
    } else {
        if (height3[right] >= rightMaxVal) {
            rightMaxVal = height3[right];
        } else {
            water3 += rightMaxVal - height3[right];
        }
        right--;
    }
}

System.out.println("Trapping Rain Water (Two Pointers): " + water3);

// ============================================
// APPROACH 4: Monotonic Stack - O(n) Time, O(n) Space
// ============================================
int[] height4 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
Stack<Integer> stack = new Stack<>();
int water4 = 0;

for (int i = 0; i < height4.length; i++) {
    while (!stack.isEmpty() && height4[i] > height4[stack.peek()]) {
        int mid = stack.pop();
        
        if (stack.isEmpty()) break;
        
        int left4 = stack.peek();
        int h = Math.min(height4[left4], height4[i]) - height4[mid];
        int w = i - left4 - 1;
        water4 += h * w;
    }
    stack.push(i);
}

System.out.println("Trapping Rain Water (Stack): " + water4);
