// ================================================
// Problem 108: Longest Increasing Subsequence
// ================================================
// Given an integer array nums, return the length of the longest 
// strictly increasing subsequence.

// ============================================
// APPROACH 1: DP - O(n²) Time, O(n) Space
// ============================================
int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
int n = nums.length;
int[] dp = new int[n];
Arrays.fill(dp, 1); // Each element is LIS of 1 by itself

for (int i = 1; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}

int lis1 = 0;
for (int len : dp) {
    lis1 = Math.max(lis1, len);
}

System.out.println("LIS (DP O(n²)): " + lis1);

// ============================================
// APPROACH 2: Binary Search - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
// Maintain array of smallest ending element for each length
int[] nums2 = {10, 9, 2, 5, 3, 7, 101, 18};
List<Integer> tails = new ArrayList<>();

for (int num : nums2) {
    // Binary search for position to insert/replace
    int left = 0, right = tails.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (tails.get(mid) < num) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    if (left == tails.size()) {
        tails.add(num);
    } else {
        tails.set(left, num);
    }
}

int lis2 = tails.size();
System.out.println("LIS (Binary Search): " + lis2);
System.out.println("Tails array: " + tails);

// ============================================
// APPROACH 3: Recursion with Memoization - O(n²) Time, O(n²) Space
// ============================================
int[] nums3 = {10, 9, 2, 5, 3, 7, 101, 18};
int[][] memo = new int[nums3.length][nums3.length + 1];
for (int[] row : memo) Arrays.fill(row, -1);

int lis3 = lisMemo(nums3, 0, -1, memo);
System.out.println("LIS (Memoization): " + lis3);

static int lisMemo(int[] nums, int idx, int prevIdx, int[][] memo) {
    if (idx == nums.length) return 0;
    
    if (memo[idx][prevIdx + 1] != -1) return memo[idx][prevIdx + 1];
    
    // Don't include current element
    int skip = lisMemo(nums, idx + 1, prevIdx, memo);
    
    // Include current element if valid
    int take = 0;
    if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {
        take = 1 + lisMemo(nums, idx + 1, idx, memo);
    }
    
    memo[idx][prevIdx + 1] = Math.max(skip, take);
    return memo[idx][prevIdx + 1];
}
