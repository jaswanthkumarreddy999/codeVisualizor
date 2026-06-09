// ================================================
// Problem 122: Jump Game
// ================================================
// Given an array where nums[i] is max jump length at position i.
// Determine if you can reach the last index.

// ============================================
// APPROACH 1: Greedy - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {2, 3, 1, 1, 4};

int maxReach = 0;

for (int i = 0; i < nums.length; i++) {
    if (i > maxReach) {
        System.out.println("Can Jump (Greedy): false");
        break;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    
    if (maxReach >= nums.length - 1) {
        System.out.println("Can Jump (Greedy): true");
        break;
    }
}

// ============================================
// APPROACH 2: DP Backward - O(n²) Time, O(n) Space
// ============================================
int[] nums2 = {2, 3, 1, 1, 4};
int n = nums2.length;
boolean[] canReach = new boolean[n];
canReach[n - 1] = true;

for (int i = n - 2; i >= 0; i--) {
    int furthest = Math.min(i + nums2[i], n - 1);
    for (int j = i + 1; j <= furthest; j++) {
        if (canReach[j]) {
            canReach[i] = true;
            break;
        }
    }
}

System.out.println("Can Jump (DP): " + canReach[0]);

// ============================================
// Visualization
// ============================================
System.out.println("\nVisualization for [2, 3, 1, 1, 4]:");
System.out.println("Index: 0  1  2  3  4");
System.out.println("i=0: maxReach = max(0, 0+2) = 2");
System.out.println("i=1: maxReach = max(2, 1+3) = 4 >= 4 ✓ Can reach!");
