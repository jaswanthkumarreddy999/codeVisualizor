// ================================================
// Problem 13: Container With Most Water
// ================================================
// Given n non-negative integers representing vertical lines at positions 
// 0 to n-1, find two lines that together with the x-axis forms a container 
// that holds the most water.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
int maxArea1 = 0;

for (int i = 0; i < height.length; i++) {
    for (int j = i + 1; j < height.length; j++) {
        int h = Math.min(height[i], height[j]);
        int w = j - i;
        int area = h * w;
        maxArea1 = Math.max(maxArea1, area);
    }
}

System.out.println("Container Water (Brute Force): " + maxArea1);

// ============================================
// APPROACH 2: Two Pointers - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Key insight: Move the pointer with smaller height inward
// because keeping it won't lead to a larger area
int[] height2 = {1, 8, 6, 2, 5, 4, 8, 3, 7};
int left = 0;
int right = height2.length - 1;
int maxArea2 = 0;

while (left < right) {
    int h = Math.min(height2[left], height2[right]);
    int w = right - left;
    int area = h * w;
    maxArea2 = Math.max(maxArea2, area);
    
    // Move the pointer with smaller height
    if (height2[left] < height2[right]) {
        left++;
    } else {
        right--;
    }
}

System.out.println("Container Water (Two Pointers): " + maxArea2);
