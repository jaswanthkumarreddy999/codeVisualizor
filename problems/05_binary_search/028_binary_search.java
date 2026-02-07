// ================================================
// Problem 28: Binary Search
// ================================================
// Given an array of integers nums sorted in ascending order, and an 
// integer target, search for target in nums. Return index or -1.

// ============================================
// APPROACH 1: Iterative - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {-1, 0, 3, 5, 9, 12};
int target = 9;

int left = 0;
int right = nums.length - 1;
int result = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;  // Avoid overflow
    
    if (nums[mid] == target) {
        result = mid;
        break;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

System.out.println("Binary Search (Iterative): " + result);

// ============================================
// APPROACH 2: Recursive - O(log n) Time, O(log n) Space
// ============================================
int[] nums2 = {-1, 0, 3, 5, 9, 12};
int target2 = 9;

// Simulating recursion with explicit stack for visualization
Stack<int[]> callStack = new Stack<>();
callStack.push(new int[]{0, nums2.length - 1});
int result2 = -1;

while (!callStack.isEmpty() && result2 == -1) {
    int[] range = callStack.pop();
    int lo = range[0];
    int hi = range[1];
    
    if (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums2[mid] == target2) {
            result2 = mid;
        } else if (nums2[mid] < target2) {
            callStack.push(new int[]{mid + 1, hi});
        } else {
            callStack.push(new int[]{lo, mid - 1});
        }
    }
}

System.out.println("Binary Search (Recursive sim): " + result2);
