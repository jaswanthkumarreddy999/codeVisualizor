// ================================================
// Problem 123: Jump Game II
// ================================================
// Given an array where nums[i] is max jump length at position i.
// Return minimum number of jumps to reach last index.

// ============================================
// APPROACH 1: Greedy - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {2, 3, 1, 1, 4};

int jumps = 0;
int currentEnd = 0;   // End of current jump range
int farthest = 0;     // Farthest we can reach

for (int i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    
    // Reached end of current jump range
    if (i == currentEnd) {
        jumps++;
        currentEnd = farthest;
        
        if (currentEnd >= nums.length - 1) break;
    }
}

System.out.println("Min Jumps (Greedy): " + jumps);

// ============================================
// APPROACH 2: BFS - O(n) Time, O(1) Space
// ============================================
// Treat as BFS where each level is one jump
int[] nums2 = {2, 3, 1, 1, 4};
int n = nums2.length;

if (n == 1) {
    System.out.println("Min Jumps (BFS): 0");
} else {
    int jumps2 = 0;
    int left = 0, right = 0;
    
    while (right < n - 1) {
        int farthest2 = 0;
        for (int i = left; i <= right; i++) {
            farthest2 = Math.max(farthest2, i + nums2[i]);
        }
        left = right + 1;
        right = farthest2;
        jumps2++;
    }
    
    System.out.println("Min Jumps (BFS): " + jumps2);
}

// ============================================
// Visualization
// ============================================
System.out.println("\nVisualization for [2, 3, 1, 1, 4]:");
System.out.println("Jump 1: From index 0, can reach indices [1, 2]");
System.out.println("        Best: index 1 (can reach up to index 4)");
System.out.println("Jump 2: From index 1, reach index 4 (end)");
System.out.println("Result: 2 jumps");
