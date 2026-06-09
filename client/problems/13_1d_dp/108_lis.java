// ================================================
// Problem 108: Longest Increasing Subsequence
// ================================================
// Given integer array nums, return length of longest strictly increasing subsequence.

// ============================================
// APPROACH 1: DP - O(n²) Time, O(n) Space
// ============================================
int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
int n = nums.length;

int[] dp = new int[n];
Arrays.fill(dp, 1);

int maxLen = 1;
for (int i = 1; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    maxLen = Math.max(maxLen, dp[i]);
}

System.out.println("LIS (DP): " + maxLen);

// ============================================
// APPROACH 2: Binary Search - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {10, 9, 2, 5, 3, 7, 101, 18};

// tails[i] = smallest tail element for LIS of length i+1
List<Integer> tails = new ArrayList<>();

for (int num : nums2) {
    int pos = Collections.binarySearch(tails, num);
    if (pos < 0) pos = -(pos + 1);
    
    if (pos == tails.size()) {
        tails.add(num);
    } else {
        tails.set(pos, num);
    }
}

System.out.println("LIS (Binary Search): " + tails.size());

// ============================================
// Visualization
// ============================================
System.out.println("\nFor [10, 9, 2, 5, 3, 7, 101, 18]:");
System.out.println("tails evolution:");
System.out.println("10: [10]");
System.out.println("9:  [9]");
System.out.println("2:  [2]");
System.out.println("5:  [2, 5]");
System.out.println("3:  [2, 3]");
System.out.println("7:  [2, 3, 7]");
System.out.println("101: [2, 3, 7, 101]");
System.out.println("18: [2, 3, 7, 18]");
System.out.println("LIS length = 4");
