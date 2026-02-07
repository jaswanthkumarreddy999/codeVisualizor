// ================================================
// Problem 121: Maximum Subarray (Kadane's Algorithm)
// ================================================
// Given an integer array nums, find the subarray with the largest sum.

// ============================================
// APPROACH 1: Kadane's Algorithm - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

int maxSum = nums[0];
int currentSum = nums[0];

for (int i = 1; i < nums.length; i++) {
    // Either extend previous subarray or start new one
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
}

System.out.println("Maximum Subarray Sum (Kadane): " + maxSum);

// ============================================
// APPROACH 2: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] nums2 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
int maxSum2 = Integer.MIN_VALUE;

for (int i = 0; i < nums2.length; i++) {
    int sum = 0;
    for (int j = i; j < nums2.length; j++) {
        sum += nums2[j];
        maxSum2 = Math.max(maxSum2, sum);
    }
}

System.out.println("Maximum Subarray Sum (Brute): " + maxSum2);

// ============================================
// APPROACH 3: Divide and Conquer - O(n log n) Time, O(log n) Space
// ============================================
int[] nums3 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
int maxSum3 = maxSubarrayDC(nums3, 0, nums3.length - 1);
System.out.println("Maximum Subarray Sum (D&C): " + maxSum3);

static int maxSubarrayDC(int[] nums, int left, int right) {
    if (left == right) return nums[left];
    
    int mid = left + (right - left) / 2;
    
    // Max in left half
    int leftMax = maxSubarrayDC(nums, left, mid);
    
    // Max in right half
    int rightMax = maxSubarrayDC(nums, mid + 1, right);
    
    // Max crossing the middle
    int crossMax = maxCrossing(nums, left, mid, right);
    
    return Math.max(Math.max(leftMax, rightMax), crossMax);
}

static int maxCrossing(int[] nums, int left, int mid, int right) {
    int leftSum = Integer.MIN_VALUE;
    int sum = 0;
    for (int i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    int rightSum = Integer.MIN_VALUE;
    sum = 0;
    for (int i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    return leftSum + rightSum;
}
